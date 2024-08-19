import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `
**পিথাগোরাসের সূত্র** একটি সমকোণী ত্রিভুজের ক্ষেত্রে, কর্ণের বর্গমানু অন্য দুটি বাহুর বর্গমানুর যোগফলের সমান। সমীকরণ: **
`;

const ReactMarkdown = () => {
  return (
    <div className="mx-auto max-w-7xl min-h-[50vh] relative w-full rounded-md p-2 border">
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
};

export default ReactMarkdown;
