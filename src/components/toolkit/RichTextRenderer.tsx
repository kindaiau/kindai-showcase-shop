import { Fragment } from "react";
import Callout from "./Callout";

interface RichTextRendererProps {
  content: string;
  className?: string;
}

type CalloutType = "tip" | "warning" | "info" | "rebel";

interface ParsedBlock {
  type: "paragraph" | "header2" | "header3" | "bulletList" | "numberedList" | "callout" | "code";
  content: string | string[];
  calloutType?: CalloutType;
}

const parseInlineFormatting = (text: string): React.ReactNode[] => {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Check for bold **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Check for italic *text* (but not **)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
    // Check for inline code `text`
    const codeMatch = remaining.match(/`(.+?)`/);
    // Check for links [text](url)
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

    // Find the earliest match
    const matches = [
      { match: boldMatch, type: "bold" },
      { match: italicMatch, type: "italic" },
      { match: codeMatch, type: "code" },
      { match: linkMatch, type: "link" },
    ].filter((m) => m.match !== null);

    if (matches.length === 0) {
      elements.push(<Fragment key={key++}>{remaining}</Fragment>);
      break;
    }

    // Sort by index to find earliest
    matches.sort((a, b) => (a.match?.index ?? 0) - (b.match?.index ?? 0));
    const earliest = matches[0];
    const match = earliest.match!;

    // Add text before the match
    if (match.index! > 0) {
      elements.push(<Fragment key={key++}>{remaining.slice(0, match.index)}</Fragment>);
    }

    // Add the formatted element
    switch (earliest.type) {
      case "bold":
        elements.push(
          <strong key={key++} className="font-semibold text-foreground">
            {match[1]}
          </strong>
        );
        break;
      case "italic":
        elements.push(
          <em key={key++} className="italic">
            {match[1]}
          </em>
        );
        break;
      case "code":
        elements.push(
          <code
            key={key++}
            className="px-1.5 py-0.5 rounded bg-muted text-kindai-pink font-mono text-sm"
          >
            {match[1]}
          </code>
        );
        break;
      case "link":
        elements.push(
          <a
            key={key++}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-kindai-blue hover:text-kindai-purple underline underline-offset-2 transition-colors"
          >
            {match[1]}
          </a>
        );
        break;
    }

    remaining = remaining.slice(match.index! + match[0].length);
  }

  return elements;
};

const parseBlocks = (content: string): ParsedBlock[] => {
  const blocks: ParsedBlock[] = [];
  const lines = content.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) {
      i++;
      continue;
    }

    // Check for callout start :::type
    const calloutStart = trimmedLine.match(/^:::(tip|warning|info|rebel)$/);
    if (calloutStart) {
      const calloutType = calloutStart[1] as CalloutType;
      const calloutContent: string[] = [];
      i++;

      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        calloutContent.push(lines[i]);
        i++;
      }
      i++; // Skip closing :::

      blocks.push({
        type: "callout",
        content: calloutContent.join("\n").trim(),
        calloutType,
      });
      continue;
    }

    // Check for headers
    if (trimmedLine.startsWith("### ")) {
      blocks.push({ type: "header3", content: trimmedLine.slice(4) });
      i++;
      continue;
    }

    if (trimmedLine.startsWith("## ")) {
      blocks.push({ type: "header2", content: trimmedLine.slice(3) });
      i++;
      continue;
    }

    // Check for bullet list
    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "bulletList", content: items });
      continue;
    }

    // Check for numbered list
    const numberedMatch = trimmedLine.match(/^\d+\.\s/);
    if (numberedMatch) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "numberedList", content: items });
      continue;
    }

    // Check for code block ```
    if (trimmedLine.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      blocks.push({ type: "code", content: codeLines.join("\n") });
      continue;
    }

    // Regular paragraph
    blocks.push({ type: "paragraph", content: trimmedLine });
    i++;
  }

  return blocks;
};

const RichTextRenderer = ({ content, className }: RichTextRendererProps) => {
  const blocks = parseBlocks(content);

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "header2":
            return (
              <h2
                key={index}
                className="text-xl font-bold text-foreground mt-6 mb-3 first:mt-0"
              >
                {parseInlineFormatting(block.content as string)}
              </h2>
            );

          case "header3":
            return (
              <h3
                key={index}
                className="text-lg font-semibold text-foreground mt-5 mb-2 first:mt-0"
              >
                {parseInlineFormatting(block.content as string)}
              </h3>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-muted-foreground leading-relaxed mb-3"
              >
                {parseInlineFormatting(block.content as string)}
              </p>
            );

          case "bulletList":
            return (
              <ul key={index} className="space-y-2 mb-4 ml-1">
                {(block.content as string[]).map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2">
                    <span className="text-kindai-pink mt-1.5">•</span>
                    <span className="text-muted-foreground leading-relaxed">
                      {parseInlineFormatting(item)}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "numberedList":
            return (
              <ol key={index} className="space-y-2 mb-4 ml-1">
                {(block.content as string[]).map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2">
                    <span className="text-kindai-blue font-semibold min-w-[1.5rem]">
                      {itemIndex + 1}.
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {parseInlineFormatting(item)}
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "callout":
            return (
              <Callout key={index} type={block.calloutType!}>
                {parseInlineFormatting(block.content as string)}
              </Callout>
            );

          case "code":
            return (
              <pre
                key={index}
                className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto my-4"
              >
                <code className="text-sm font-mono text-foreground">
                  {block.content}
                </code>
              </pre>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default RichTextRenderer;
