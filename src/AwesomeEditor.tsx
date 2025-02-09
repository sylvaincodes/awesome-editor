"use client";

import type React from "react";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { diffChars } from "diff";
import "./AwesomeEditor.css";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import AIContentModal from "./AIContentModal";

interface AwesomeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface AwesomeEditorRef {
  getContent: () => string;
  setContent: (content: string) => void;
}

interface CustomRule {
  find: string;
  replace: string;
}

interface HistoryEntry {
  content: string;
  selectionStart: number;
  selectionEnd: number;
}

const fonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];

const fontSizes = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "36px",
  "48px",
  "72px",
];

const lineHeights = ["1", "1.15", "1.5", "2", "2.5", "3"];

const colors = [
  "#000000", // Black
  "#FFFFFF", // White
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#808080", // Gray
  "#800000", // Maroon
  "#808000", // Olive
  "#008000", // Dark Green
  "#800080", // Purple
  "#008080", // Teal
  "#000080", // Navy
];

const AwesomeEditor = forwardRef<AwesomeEditorRef, AwesomeEditorProps>(
  ({ value = "", onChange, className }, ref) => {
    const [content, setContent] = useState(value);
    const [mode, setMode] = useState<"wysiwyg" | "markdown">("wysiwyg");
    const [cleanPasteEnabled, setCleanPasteEnabled] = useState(true);
    const [showPastePreview, setShowPastePreview] = useState(true);
    const [customRules, setCustomRules] = useState<CustomRule[]>([]);
    const [isCustomRulesModalOpen, setIsCustomRulesModalOpen] = useState(false);
    const [newRule, setNewRule] = useState<CustomRule>({
      find: "",
      replace: "",
    });
    const [pastePreviewData, setPastePreviewData] = useState<{
      original: string;
      cleaned: string;
    } | null>(null);
    const [history, setHistory] = useState<HistoryEntry[]>([
      { content: value, selectionStart: 0, selectionEnd: 0 },
    ]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isInlineDiffEnabled, setIsInlineDiffEnabled] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [tableRows, setTableRows] = useState(2);
    const [tableColumns, setTableColumns] = useState(2);
    const [tableHeaders, setTableHeaders] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isAIContentModalOpen, setIsAIContentModalOpen] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const resizeRef = useRef<HTMLDivElement>(null);
    const [editorWidth, setEditorWidth] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (editorRef.current && content !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = content;
        setTimeout(() => {
          setCaretToEnd();
        }, 0);
      }
    }, [content]);

    useEffect(() => {
      if (mode === "markdown") {
        Prism.highlightAll();
      }
    }, [mode]);

    useImperativeHandle(ref, () => ({
      getContent: () => content,
      setContent: (newContent: string) => setContent(newContent),
    }));

    const getTextOffset = useCallback(
      (root: Node, node: Node, offset: number): number => {
        let totalOffset = 0;

        const traverse = (currentNode: Node) => {
          if (currentNode === node) {
            totalOffset += offset;
            return true;
          }
          if (
            currentNode.nodeType === Node.TEXT_NODE &&
            currentNode.textContent
          ) {
            totalOffset += currentNode.textContent.length;
          } else if (currentNode.childNodes) {
            for (let i = 0; i < currentNode.childNodes.length; i++) {
              if (traverse(currentNode.childNodes[i])) {
                return true;
              }
            }
          }

          return false;
        };

        traverse(root);
        return totalOffset;
      },
      []
    );

    const setCaretToEnd = useCallback(() => {
      if (editorRef.current) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
        editorRef.current.focus();

        // Scroll to the end of the content
        editorRef.current.scrollTop = editorRef.current.scrollHeight;
      }
    }, []);

    const addToHistory = useCallback(
      (newContent: string) => {
        const selection = window.getSelection();
        let newEntry: HistoryEntry = {
          content: newContent,
          selectionStart: 0,
          selectionEnd: 0,
        };

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          newEntry = {
            content: newContent,
            selectionStart: range
              ? getTextOffset(
                  editorRef.current!,
                  range.startContainer,
                  range.startOffset
                )
              : 0,
            selectionEnd: range
              ? getTextOffset(
                  editorRef.current!,
                  range.endContainer,
                  range.endOffset
                )
              : 0,
          };
        }

        // Only add to history if the content has changed
        if (history[historyIndex]?.content !== newContent) {
          setHistory((prevHistory) => [
            ...prevHistory.slice(0, historyIndex + 1),
            newEntry,
          ]);
          setHistoryIndex((prevIndex) => prevIndex + 1);
        }
      },
      [history, historyIndex, getTextOffset]
    );

    const handleInput = useCallback(() => {
      const newContent = editorRef.current?.innerHTML || "";
      if (content !== newContent) {
        setContent(newContent);
        onChange?.(newContent);
        addToHistory(newContent);

        // Use setTimeout to ensure the cursor is set after the content update
        setTimeout(() => {
          setCaretToEnd();
        }, 0);
      }
    }, [content, onChange, addToHistory, setCaretToEnd]);

    const execCommand = useCallback(
      (command: string, value: string | undefined = undefined) => {
        if (
          command === "insertOrderedList" ||
          command === "insertUnorderedList"
        ) {
          const selection = window.getSelection();
          const range = selection?.getRangeAt(0);
          if (range) {
            const listElement = document.createElement(
              command === "insertOrderedList" ? "ol" : "ul"
            );
            const listItem = document.createElement("li");
            listItem.appendChild(range.extractContents());
            listElement.appendChild(listItem);
            range.insertNode(listElement);
            range.selectNodeContents(listItem);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        } else {
          document.execCommand(command, false, value);
        }
        editorRef.current?.focus();
        handleInput();
      },
      [handleInput]
    );

    const handleColorChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
      command: string
    ) => {
      execCommand(command, event.target.value);
    };

    const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      execCommand("fontName", event.target.value);
    };

    const handleLinkInsert = () => {
      const url = prompt("Enter the URL:");
      if (url) {
        execCommand("createLink", url);
      }
    };

    const handleImageInsert = () => {
      const url = prompt("Enter the image URL:");
      if (url) {
        execCommand("insertImage", url);
      }
    };

    const handleTableInsert = () => {
      setIsTableModalOpen(true);
    };

    const insertTable = () => {
      let table = '<table style="border-collapse: collapse; width: 100%;">';

      if (tableHeaders) {
        table += "<thead><tr>";
        for (let j = 0; j < tableColumns; j++) {
          table +=
            '<th style="border: 1px solid black; padding: 8px;">Header</th>';
        }
        table += "</tr></thead>";
      }

      table += "<tbody>";
      for (let i = 0; i < tableRows; i++) {
        table += "<tr>";
        for (let j = 0; j < tableColumns; j++) {
          table +=
            '<td style="border: 1px solid black; padding: 8px;">Cell</td>';
        }
        table += "</tr>";
      }
      table += "</tbody></table>";

      execCommand("insertHTML", table);
      setIsTableModalOpen(false);
    };

    const handleCodeBlock = () => {
      const language = prompt("Enter the programming language:");
      if (language) {
        const code = `<pre><code class="language-${language}">
// Your code here
</code></pre>`;
        execCommand("insertHTML", code);
      }
    };

    const toggleMode = () => {
      if (mode === "wysiwyg") {
        setMode("markdown");
        setContent(marked(content));
      } else {
        setMode("wysiwyg");
        setContent(content);
      }
    };

    const cleanPastedHTML = (html: string): string => {
      // Remove all attributes except 'href' for links and 'src' for images
      html = html.replace(
        /<([a-z][a-z0-9]*)[^>]*?(href="[^"]*"|src="[^"]*")?[^>]*>/gi,
        "<$1 $2>"
      );

      // Remove comments
      html = html.replace(/<!--[\s\S]*?-->/g, "");

      // Remove specific MS Office and Google Docs classes
      html = html.replace(
        /class="(Mso[^"]*|gmail[^"]*|Apple-[^"]*|v:[^"]*|o:[^"]*)"/gi,
        ""
      );

      // Remove empty tags
      html = html.replace(/<([a-z][a-z0-9]*)[^>]*>(\s*|&nbsp;)<\/\1>/gi, "");

      // Remove specific MS Office and Google Docs spans
      html = html.replace(
        /<span\s+style="[^"]*mso-[^"]*"[^>]*>(\s*)<\/span>/gi,
        "$1"
      );
      html = html.replace(
        /<span\s+style="[^"]*font-family:[^"]*"[^>]*>(\s*)<\/span>/gi,
        "$1"
      );

      // Convert <b> to <strong> and <i> to <em>
      html = html.replace(/<b\b[^>]*>(.*?)<\/b>/gi, "<strong>$1</strong>");
      html = html.replace(/<i\b[^>]*>(.*?)<\/i>/gi, "<em>$1</em>");

      // Apply custom rules
      customRules.forEach((rule) => {
        const regex = new RegExp(rule.find, "g");
        html = html.replace(regex, rule.replace);
      });

      return html.trim();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const clipboardData = e.clipboardData;
      let pastedData;

      if (clipboardData.types.includes("text/html")) {
        pastedData = clipboardData.getData("text/html");
      } else if (clipboardData.types.includes("text/plain")) {
        pastedData = clipboardData.getData("text/plain");
      } else if (clipboardData.files.length > 0) {
        handleFilePaste(clipboardData.files);
        return;
      } else {
        return;
      }

      if (cleanPasteEnabled) {
        const cleanedHtml = cleanPastedHTML(pastedData);

        if (showPastePreview) {
          setPastePreviewData({ original: pastedData, cleaned: cleanedHtml });
        } else {
          insertContent(cleanedHtml);
        }
      } else {
        insertContent(pastedData);
      }
    };

    const handleFilePaste = (files: FileList) => {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target?.result as string;
            img.style.maxWidth = "100%";
            insertContent(img.outerHTML);
          };
          reader.readAsDataURL(file);
        } else {
          console.warn("Unsupported file type:", file.type);
        }
      });
    };

    const insertContent = useCallback(
      (content: string) => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const fragment = range.createContextualFragment(content);
          range.insertNode(fragment);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        } else if (editorRef.current) {
          // If there's no selection, append the content to the end of the editor
          const range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          const fragment = range.createContextualFragment(content);
          range.insertNode(fragment);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
        handleInput();
      },
      [handleInput]
    );

    const handlePasteFromPreview = (content: string) => {
      insertContent(content);
      setPastePreviewData(null);
    };

    const addCustomRule = () => {
      if (newRule.find && newRule.replace) {
        setCustomRules([...customRules, newRule]);
        setNewRule({ find: "", replace: "" });
      }
    };

    const removeCustomRule = (index: number) => {
      const updatedRules = customRules.filter((_, i) => i !== index);
      setCustomRules(updatedRules);
    };

    const undo = () => {
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        const prevEntry = history[prevIndex];
        if (prevEntry) {
          setHistoryIndex(prevIndex);
          setContent(prevEntry.content);
          restoreSelection(prevEntry);
        }
      }
    };

    const redo = () => {
      if (historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1;
        const nextEntry = history[nextIndex];
        if (nextEntry) {
          setHistoryIndex(nextIndex);
          setContent(nextEntry.content);
          restoreSelection(nextEntry);
        }
      }
    };

    const restoreSelection = (entry: HistoryEntry) => {
      if (editorRef.current) {
        const range = document.createRange();
        const selection = window.getSelection();
        let startNode: Node | null = editorRef.current;
        let endNode: Node | null = editorRef.current;
        let startOffset = entry.selectionStart;
        let endOffset = entry.selectionEnd;

        // Traverse the DOM tree to find the correct text node and offset
        const traverse = (
          node: Node,
          offset: number
        ): [Node | null, number] => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (offset <= (node.textContent?.length || 0)) {
              return [node, offset];
            } else {
              offset -= node.textContent?.length || 0;
            }
          } else {
            for (let i = 0; i < node.childNodes.length; i++) {
              const [foundNode, remainingOffset] = traverse(
                node.childNodes[i],
                offset
              );
              if (foundNode) {
                return [foundNode, remainingOffset];
              }
            }
          }
          return [null, offset];
        };
        [startNode, startOffset] = traverse(
          editorRef.current,
          entry.selectionStart
        );
        [endNode, endOffset] = traverse(editorRef.current, entry.selectionEnd);

        if (startNode && endNode) {
          range.setStart(startNode, startOffset);
          range.setEnd(endNode, endOffset);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    };

    const saveRuleSet = () => {
      const ruleSetName = prompt("Enter a name for this rule set:");
      if (ruleSetName) {
        const ruleSet = JSON.stringify(customRules);
        localStorage.setItem(`ruleSet_${ruleSetName}`, ruleSet);
        alert("Rule set saved successfully!");
      }
    };

    const loadRuleSet = () => {
      const ruleSetName = prompt("Enter the name of the rule set to load:");
      if (ruleSetName) {
        const ruleSet = localStorage.getItem(`ruleSet_${ruleSetName}`);
        if (ruleSet) {
          setCustomRules(JSON.parse(ruleSet));
          alert("Rule set loaded successfully!");
        } else {
          alert("Rule set not found!");
        }
      }
    };

    const renderInlineDiff = (original: string, cleaned: string) => {
      const diff = diffChars(original, cleaned);
      return diff.map((part, index) => {
        const color = part.added ? "green" : part.removed ? "red" : "grey";
        return (
          <span key={index} style={{ color }}>
            {part.value}
          </span>
        );
      });
    };

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          const selection = window.getSelection();
          const range = selection?.getRangeAt(0);
          const currentNode = range?.startContainer;
          const listItem = currentNode?.parentElement;

          if (listItem?.tagName === "LI") {
            e.preventDefault();
            if (listItem.textContent?.trim() === "") {
              const list = listItem.parentElement;
              if (list) {
                list.removeChild(listItem);
                if (list.childNodes.length === 0) {
                  list.parentElement?.removeChild(list);
                }
              }
              execCommand("insertParagraph");
            } else {
              const newListItem = document.createElement("li");
              const list = listItem.parentElement;
              list?.insertBefore(newListItem, listItem.nextSibling);
              const newRange = document.createRange();
              newRange.setStart(newListItem, 0);
              newRange.setEnd(newListItem, 0);
              selection?.removeAllRanges();
              selection?.addRange(newRange);
            }
            handleInput();
          }
        }
      },
      [execCommand, handleInput]
    );

    const ensureProperListNesting = useCallback(() => {
      if (editorRef.current) {
        const listElements = editorRef.current.querySelectorAll("ul, ol");
        listElements.forEach((list) => {
          const parent = list.parentElement;
          if (
            parent &&
            parent.tagName !== "LI" &&
            parent !== editorRef.current
          ) {
            const wrapper = document.createElement("li");
            parent.insertBefore(wrapper, list);
            wrapper.appendChild(list);
          }
        });
      }
    }, []);

    const updateCursorPosition = useCallback(() => {
      if (editorRef.current) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          const editorRect = editorRef.current.getBoundingClientRect();

          if (rect.bottom > editorRect.bottom) {
            editorRef.current.scrollTop =
              editorRef.current.scrollTop +
              (rect.bottom - editorRect.bottom) +
              5;
          } else if (rect.top < editorRect.top) {
            editorRef.current.scrollTop =
              editorRef.current.scrollTop - (editorRect.top - rect.top) - 5;
          }

          if (rect.right > editorRect.right) {
            editorRef.current.scrollLeft =
              editorRef.current.scrollLeft +
              (rect.right - editorRect.right) +
              5;
          } else if (rect.left < editorRect.left) {
            editorRef.current.scrollLeft =
              editorRef.current.scrollLeft - (editorRect.left - rect.left) - 5;
          }
        }
      }
    }, []);

    const handleTextDirection = useCallback(() => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const element = range.startContainer.parentElement;
        if (element) {
          const currentDir = element.getAttribute("dir") || "ltr";
          const newDir = currentDir === "ltr" ? "rtl" : "ltr";
          element.setAttribute("dir", newDir);
          handleInput();
        }
      }
    }, [handleInput]);

    useEffect(() => {
      const handleSelectionChange = () => {
        updateCursorPosition();
      };

      document.addEventListener("selectionchange", handleSelectionChange);

      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }, [updateCursorPosition]);

    const toggleCase = useCallback(() => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const text = range.toString();
        let newText: string;

        if (text === text.toUpperCase()) {
          newText = text.toLowerCase();
        } else if (text === text.toLowerCase()) {
          newText = text.replace(
            /\w\S*/g,
            (word) =>
              word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
          );
        } else {
          newText = text.toUpperCase();
        }

        range.deleteContents();
        range.insertNode(document.createTextNode(newText));
        handleInput();
      }
    }, [handleInput]);

    const addRowAbove = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cell = (range.startContainer as Element).closest("td, th");
        if (cell) {
          const row = cell.parentElement;
          if (row) {
            const newRow = row.cloneNode(true) as HTMLTableRowElement;
            Array.from(newRow.children).forEach(
              (cell) => (cell.textContent = "")
            );
            row.parentElement?.insertBefore(newRow, row);
            handleInput();
          }
        }
      }
    };

    const addRowBelow = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cell = (range.startContainer as Element).closest("td, th");
        if (cell) {
          const row = cell.parentElement;
          if (row) {
            const newRow = row.cloneNode(true) as HTMLTableRowElement;
            Array.from(newRow.children).forEach(
              (cell) => (cell.textContent = "")
            );
            row.parentElement?.insertBefore(newRow, row.nextSibling);
            handleInput();
          }
        }
      }
    };

    const addColumnLeft = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cell = (range.startContainer as Element).closest("td, th");
        if (cell) {
          const table = cell.closest("table");
          const cellIndex = Array.from(
            cell.parentElement?.children || []
          ).indexOf(cell);
          table?.querySelectorAll("tr").forEach((row) => {
            const newCell = document.createElement(
              row.parentElement?.tagName === "THEAD" ? "th" : "td"
            );
            newCell.style.cssText = "border: 1px solid black; padding: 8px;";
            row.insertBefore(newCell, row.children[cellIndex]);
          });
          handleInput();
        }
      }
    };

    const addColumnRight = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cell = (range.startContainer as Element).closest("td, th");
        if (cell) {
          const table = cell.closest("table");
          const cellIndex = Array.from(
            cell.parentElement?.children || []
          ).indexOf(cell);
          table?.querySelectorAll("tr").forEach((row) => {
            const newCell = document.createElement(
              row.parentElement?.tagName === "THEAD" ? "th" : "td"
            );
            newCell.style.cssText = "border: 1px solid black; padding: 8px;";
            row.insertBefore(newCell, row.children[cellIndex + 1]);
          });
          handleInput();
        }
      }
    };

    const deleteRow = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cell = (range.startContainer as Element).closest("td, th");
        if (cell) {
          const row = cell.parentElement;
          row?.parentElement?.removeChild(row);
          handleInput();
        }
      }
    };

    const deleteColumn = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const cell = (range.startContainer as Element).closest("td, th");
        if (cell) {
          const table = cell.closest("table");
          const cellIndex = Array.from(
            cell.parentElement?.children || []
          ).indexOf(cell);
          table?.querySelectorAll("tr").forEach((row) => {
            row.removeChild(row.children[cellIndex]);
          });
          handleInput();
        }
      }
    };

    const deleteTable = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const table = (range.startContainer as Element).closest("table");
        if (table) {
          table.parentElement?.removeChild(table);
          handleInput();
        }
      }
    };

    const handleMenuClick = (menu: string) => {
      setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
    };

    const handleMenuAction = (action: () => void) => {
      action();
      setActiveMenu(null);
    };

    const renderMenus = () => {
      return (
        <div className="menu-bar">
          {["file", "edit", "insert", "format", "tools"].map((menu) => (
            <div
              key={menu}
              className={`menu-item ${activeMenu === menu ? "active" : ""}`}
              onClick={() => handleMenuClick(menu)}
            >
              {menu.charAt(0).toUpperCase() + menu.slice(1)}
              {activeMenu === menu && (
                <div className="menu-dropdown">
                  {menu === "file" && (
                    <>
                      <button
                        onClick={() =>
                          handleMenuAction(() => {
                            setContent("");
                            onChange?.("");
                          })
                        }
                      >
                        New
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => {
                            const fileInput = document.createElement("input");
                            fileInput.type = "file";
                            fileInput.accept = ".txt,.html,.md";
                            fileInput.onchange = (e) => {
                              const file = (e.target as HTMLInputElement)
                                .files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  const content = e.target?.result as string;
                                  setContent(content);
                                  onChange?.(content);
                                };
                                reader.readAsText(file);
                              }
                            };
                            fileInput.click();
                          })
                        }
                      >
                        Open
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => {
                            const blob = new Blob([content], {
                              type: "text/plain",
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = "document.txt";
                            a.click();
                            URL.revokeObjectURL(url);
                          })
                        }
                      >
                        Save
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => {
                            console.log(
                              "Export as PDF functionality to be implemented"
                            );
                          })
                        }
                      >
                        Export as PDF
                      </button>
                    </>
                  )}
                  {menu === "edit" && (
                    <>
                      <button onClick={() => handleMenuAction(undo)}>
                        Undo
                      </button>
                      <button onClick={() => handleMenuAction(redo)}>
                        Redo
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => document.execCommand("cut"))
                        }
                      >
                        Cut
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => document.execCommand("copy"))
                        }
                      >
                        Copy
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => document.execCommand("paste"))
                        }
                      >
                        Paste
                      </button>
                      <button onClick={() => handleMenuAction(toggleCase)}>
                        Toggle Case
                      </button>
                    </>
                  )}
                  {menu === "insert" && (
                    <>
                      <button
                        onClick={() => handleMenuAction(handleImageInsert)}
                      >
                        Image
                      </button>
                      <button
                        onClick={() => handleMenuAction(handleLinkInsert)}
                      >
                        Link
                      </button>
                      <button
                        onClick={() => handleMenuAction(handleTableInsert)}
                      >
                        Table
                      </button>
                      <button onClick={() => handleMenuAction(handleCodeBlock)}>
                        Code Block
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => setIsAIContentModalOpen(true))
                        }
                      >
                        AI Content
                      </button>
                      <button
                        onClick={() => handleMenuAction(handleLocalFileImport)}
                      >
                        Import Local File
                      </button>
                    </>
                  )}
                  {menu === "format" && (
                    <>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("bold"))
                        }
                      >
                        Bold
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("italic"))
                        }
                      >
                        Italic
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("underline"))
                        }
                      >
                        Underline
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("strikeThrough"))
                        }
                      >
                        Strikethrough
                      </button>
                      <select
                        onChange={(e) =>
                          handleMenuAction(() => handleFontChange(e))
                        }
                      >
                        <option value="">Font</option>
                        {fonts.map((font) => (
                          <option key={font} value={font}>
                            {font}
                          </option>
                        ))}
                      </select>
                      <select
                        onChange={(e) =>
                          handleMenuAction(() =>
                            execCommand("fontSize", e.target.value)
                          )
                        }
                      >
                        <option value="">Font Size</option>
                        {fontSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      <select
                        onChange={(e) =>
                          handleMenuAction(() =>
                            execCommand("lineHeight", e.target.value)
                          )
                        }
                      >
                        <option value="">Line Height</option>
                        {lineHeights.map((height) => (
                          <option key={height} value={height}>
                            {height}
                          </option>
                        ))}
                      </select>
                      <select
                        onChange={(e) =>
                          handleMenuAction(() =>
                            handleColorChange(e, "foreColor")
                          )
                        }
                      >
                        <option value="">Text Color</option>
                        {colors.map((color) => (
                          <option
                            key={color}
                            value={color}
                            style={{ backgroundColor: color }}
                          >
                            {color}
                          </option>
                        ))}
                      </select>
                      <select
                        onChange={(e) =>
                          handleMenuAction(() =>
                            handleColorChange(e, "hiliteColor")
                          )
                        }
                      >
                        <option value="">Highlight Color</option>
                        {colors.map((color) => (
                          <option
                            key={color}
                            value={color}
                            style={{ backgroundColor: color }}
                          >
                            {color}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("justifyLeft"))
                        }
                      >
                        Align Left
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("justifyCenter"))
                        }
                      >
                        Align Center
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("justifyRight"))
                        }
                      >
                        Align Right
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("justifyFull"))
                        }
                      >
                        Justify
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() =>
                            execCommand("insertOrderedList")
                          )
                        }
                      >
                        Ordered List
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() =>
                            execCommand("insertUnorderedList")
                          )
                        }
                      >
                        Unordered List
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("indent"))
                        }
                      >
                        Indent
                      </button>
                      <button
                        onClick={() =>
                          handleMenuAction(() => execCommand("outdent"))
                        }
                      >
                        Outdent
                      </button>
                      <button
                        onClick={() => handleMenuAction(handleTextDirection)}
                      >
                        Toggle Text Direction
                      </button>
                    </>
                  )}
                  {menu === "tools" && (
                    <>
                      <button
                        onClick={() =>
                          handleMenuAction(() =>
                            setIsCustomRulesModalOpen(true)
                          )
                        }
                      >
                        Custom Paste Rules
                      </button>
                      <button onClick={() => handleMenuAction(saveRuleSet)}>
                        Save Rule Set
                      </button>
                      <button onClick={() => handleMenuAction(loadRuleSet)}>
                        Load Rule Set
                      </button>
                      <label>
                        <input
                          type="checkbox"
                          checked={cleanPasteEnabled}
                          onChange={(e) =>
                            setCleanPasteEnabled(e.target.checked)
                          }
                        />
                        Clean Paste
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={showPastePreview}
                          onChange={(e) =>
                            setShowPastePreview(e.target.checked)
                          }
                        />
                        Show Paste Preview
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (activeMenu && !(event.target as Element).closest(".menu-item")) {
          setActiveMenu(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [activeMenu]);

    const handleAIContentGeneration = async (prompt: string) => {
      try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          throw new Error("OpenAI API key not found");
        }
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: prompt,
        });
        insertContent(text);
      } catch (error) {
        console.error("Error generating AI content:", error);
        alert(
          "An error occurred while generating AI content. Please check your API key and try again."
        );
      }
    };

    useEffect(() => {
      const handleResize = () => {
        if (resizeRef.current) {
          setEditorWidth(resizeRef.current.offsetWidth);
        }
      };

      const resizeObserver = new ResizeObserver(handleResize);
      if (resizeRef.current) {
        resizeObserver.observe(resizeRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;
        const editor = resizeRef.current;
        if (editor) {
          const newWidth = e.clientX - editor.getBoundingClientRect().left;
          const newHeight = e.clientY - editor.getBoundingClientRect().top;
          editor.style.width = `${newWidth}px`;
          editor.style.height = `${newHeight}px`;
          setEditorWidth(newWidth);
        }
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      if (isResizing) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isResizing]);

    const handleLocalFileImport = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          let content = "";
          if (file.type.startsWith("image/")) {
            content = `<img src="${result}" alt="${file.name}" style="max-width: 100%;">`;
          } else if (file.type.startsWith("audio/")) {
            content = `<audio controls><source src="${result}" type="${file.type}">Your browser does not support the audio element.</audio>`;
          } else if (file.type.startsWith("video/")) {
            content = `<video controls style="max-width: 100%;"><source src="${result}" type="${file.type}">Your browser does not support the video element.</video>`;
          } else {
            content = `<a href="${result}" download="${file.name}">${file.name}</a>`;
          }

          // Ensure the editor has focus before inserting content
          if (editorRef.current) {
            editorRef.current.focus();
            const selection = window.getSelection();
            if (selection && selection.rangeCount === 0) {
              const range = document.createRange();
              range.selectNodeContents(editorRef.current);
              range.collapse(false);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }

          insertContent(content);
        }
      };

      reader.readAsDataURL(file);
    };

    return (
      <div className={`awesome-editor ${className || ""}`} ref={resizeRef}>
        {renderMenus()}
        <div
          className="toolbar"
          style={{
            fontSize: `${Math.max(10, Math.min(14, editorWidth / 50))}px`,
          }}
        >
          <select
            onChange={(e) => handleMenuAction(() => handleFontChange(e))}
            title="Font"
          >
            <option value="">Font</option>
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          <select
            onChange={(e) =>
              handleMenuAction(() => execCommand("fontSize", e.target.value))
            }
            title="Font Size"
          >
            <option value="">Size</option>
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleMenuAction(() => execCommand("bold"))}
            title="Bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M6 4v13h4.54c1.37 0 2.46-.33 3.26-1 .8-.66 1.2-1.58 1.2-2.77 0-.84-.17-1.51-.51-2.01s-.9-.85-1.67-1.03v-.09c.57-.1 1.02-.4 1.36-.9s.51-1.13.51-1.91c0-1.14-.39-1.98-1.17-2.5C12.75 4.26 11.5 4 9.78 4H6zm2.57 5.15V6.26h1.36c.73 0 1.27.11 1.61.32.34.22.51.58.51 1.07 0 .54-.16.92-.47 1.15s-.82.35-1.51.35h-1.5zm0 2.19h1.61c1.67 0 2.51.65 2.51 1.96 0 .66-.16 1.15-.48 1.48-.32.32-.82.48-1.51.48h-2.13V11.34z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(() => execCommand("italic"))}
            title="Italic"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(() => execCommand("underline"))}
            title="Underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(() => execCommand("strikeThrough"))}
            title="Strike Through"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(() => execCommand("justifyLeft"))}
            title="Align Left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(() => execCommand("justifyCenter"))}
            title="Align Center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(() => execCommand("justifyRight"))}
            title="Align Right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(() => execCommand("justifyFull"))}
            title="Justify"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" />
            </svg>
          </button>
          <button
            onClick={() =>
              handleMenuAction(() => execCommand("insertOrderedList"))
            }
            title="Ordered List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
            </svg>
          </button>
          <button
            onClick={() =>
              handleMenuAction(() => execCommand("insertUnorderedList"))
            }
            title="Unordered List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(handleLinkInsert)}
            title="Insert Link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(handleImageInsert)}
            title="Insert Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(handleTableInsert)}
            title="Insert Table"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(handleCodeBlock)}
            title="Insert Code Block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(toggleMode)}
            title="Toggle Markdown Mode"
          >
            {mode === "wysiwyg" ? "MD" : "WYSIWYG"}
          </button>
          <button onClick={() => handleMenuAction(undo)} title="Undo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
            </svg>
          </button>
          <button onClick={() => handleMenuAction(redo)} title="Redo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
            </svg>
          </button>
          <button
            onClick={() => handleMenuAction(handleTextDirection)}
            title="Toggle Text Direction"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z" />
            </svg>
          </button>
          <div className="paste-options">
            <label>
              <input
                type="checkbox"
                checked={cleanPasteEnabled}
                onChange={(e) => setCleanPasteEnabled(e.target.checked)}
              />
              Clean Paste
            </label>
            <label>
              <input
                type="checkbox"
                checked={showPastePreview}
                onChange={(e) => setShowPastePreview(e.target.checked)}
              />
              Show Paste Preview
            </label>
            <label>
              <input
                type="checkbox"
                checked={isInlineDiffEnabled}
                onChange={(e) => setIsInlineDiffEnabled(e.target.checked)}
              />
              Inline Diff View
            </label>
            <button
              onClick={() =>
                handleMenuAction(() => setIsCustomRulesModalOpen(true))
              }
            >
              Custom Rules
            </button>
            <button onClick={() => handleMenuAction(saveRuleSet)}>
              Save Rule Set
            </button>
            <button onClick={() => handleMenuAction(loadRuleSet)}>
              Load Rule Set
            </button>
          </div>
          <button
            onClick={() => handleMenuAction(toggleCase)}
            title="Toggle Case"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
            </svg>
          </button>
        </div>
        {mode === "wysiwyg" ? (
          <div
            ref={editorRef}
            className="editor-content"
            contentEditable
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="editor-content markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
        {pastePreviewData && (
          <div className="paste-preview">
            <h3>Paste Preview</h3>
            <div className="preview-content">
              <div>
                <h4>Original</h4>
                {isInlineDiffEnabled ? (
                  <div>
                    {renderInlineDiff(
                      pastePreviewData.original,
                      pastePreviewData.cleaned
                    )}
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pastePreviewData.original,
                    }}
                  />
                )}
              </div>
              {!isInlineDiffEnabled && (
                <div>
                  <h4>Cleaned</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pastePreviewData.cleaned,
                    }}
                  />
                </div>
              )}
            </div>
            <div className="preview-actions">
              <button
                onClick={() =>
                  handlePasteFromPreview(pastePreviewData.original)
                }
              >
                Use Original
              </button>
              <button
                onClick={() => handlePasteFromPreview(pastePreviewData.cleaned)}
              >
                Use Cleaned
              </button>
              <button onClick={() => setPastePreviewData(null)}>Cancel</button>
            </div>
          </div>
        )}
        {isCustomRulesModalOpen && (
          <div className="custom-rules-modal">
            <h3>Custom Paste Rules</h3>
            <div className="custom-rules-list">
              {customRules.map((rule, index) => (
                <div key={index} className="custom-rule">
                  <span>Find: {rule.find}</span>
                  <span>Replace: {rule.replace}</span>
                  <button onClick={() => removeCustomRule(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="add-custom-rule">
              <input
                type="text"
                placeholder="Find"
                value={newRule.find}
                onChange={(e) =>
                  setNewRule({ ...newRule, find: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Replace"
                value={newRule.replace}
                onChange={(e) =>
                  setNewRule({ ...newRule, replace: e.target.value })
                }
              />
              <button onClick={addCustomRule}>Add Rule</button>
            </div>
            <button onClick={() => setIsCustomRulesModalOpen(false)}>
              Close
            </button>
          </div>
        )}
        {isTableModalOpen && (
          <div className="table-modal">
            <h3>Insert Table</h3>
            <div>
              <label>
                Rows:
                <input
                  type="number"
                  min="1"
                  value={tableRows}
                  onChange={(e) =>
                    setTableRows(Number.parseInt(e.target.value))
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Columns:
                <input
                  type="number"
                  min="1"
                  value={tableColumns}
                  onChange={(e) =>
                    setTableColumns(Number.parseInt(e.target.value))
                  }
                />
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={tableHeaders}
                  onChange={(e) => setTableHeaders(e.target.checked)}
                />
                Include headers
              </label>
            </div>
            <div>
              <button onClick={insertTable}>Insert</button>
              <button onClick={() => setIsTableModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}
        <AIContentModal
          isOpen={isAIContentModalOpen}
          onClose={() => setIsAIContentModalOpen(false)}
          onGenerate={(prompt) => {
            handleAIContentGeneration(prompt);
            setIsAIContentModalOpen(false);
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*,audio/*,video/*"
        />
        <div
          className="resize-handle"
          onMouseDown={() => setIsResizing(true)}
        />
      </div>
    );
  }
);

AwesomeEditor.displayName = "AwesomeEditor";

export default AwesomeEditor;
