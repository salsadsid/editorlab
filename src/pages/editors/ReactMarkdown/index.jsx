import "katex/dist/katex.min.css";
import React, { useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const hints = [
  "পিথাগোরাসের সূত্র",
  "ঐকিক নিয়ম",
  "ত্রিভুজের ক্ষেত্রফলের সূত্র",
  "মহাকর্ষীয় ধ্রুবক কাকে বলে",
];

const exampleMarkdown = [
  `মহাকর্ষীয় ধ্রুবক (Gravitational Constant) হলো একটি মৌলিক ধ্রুবক যা মহাকর্ষীয় শক্তির পরিমাণ নির্ধারণ করে। একে সাধারণত \\( G \\) দ্বারা চিহ্নিত করা হয়। নিউটনের মহাকর্ষীয় সূত্র অনুযায়ী, মহাকর্ষীয় ধ্রুবক \\( G \\) এর মান হলো \\( 6.674 \\times 10^{-11} \\, \\text{Nm}^2/\\text{kg}^2 \\)।

নিউটনের মহাকর্ষীয় সূত্র অনুযায়ী, দুইটি বস্তুর মধ্যে মহাকর্ষীয় আকর্ষণ বলের পরিমাণ নির্ভর করে তাদের ভর এবং তাদের মধ্যে দূরত্বের উপর। সূত্রটি হলো:

\\[
F = \\frac{G \\cdot m_1 \\cdot m_2}{r^2}
\\]

এখানে, 
- \\( F \\) হলো মহাকর্ষীয় আকর্ষণ বল,
- \\( m_1 \\) এবং \\( m_2 \\) হলো দুই বস্তুর ভর,
- \\( r \\) হলো তাদের মধ্যে দূরত্ব, এবং
- \\( G \\) হলো মহাকর্ষীয় ধ্রুবক।

\\( G \\) এর মান বিশ্বব্যাপী একক এবং এটি আমাদের মহাবিশ্বে মহাকর্ষীয় বল কেমন কাজ করে তা নির্ধারণ করে।`,
  `সাধারণ ডিফারেন্সিয়াল সমীকরণ (Ordinary Differential Equation বা ODE) হলো এমন একটি সমীকরণ যা একটি অজানা ফাংশন এবং তার বিভিন্ন ডেরিভেটিভগুলির মধ্যে সম্পর্ক নির্দেশ করে। সাধারণ ডিফারেন্সিয়াল সমীকরণগুলো এক বা একাধিক চলকের ফাংশন এবং সেই চলকগুলির ডেরিভেটিভ সমূহকে অন্তর্ভুক্ত করে। 

### সাধারণ ডিফারেন্সিয়াল সমীকরণের সাধারণ রূপ:

\\[
\\frac{dy}{dx} = f(x, y)
\\]

এখানে:
- \\( y \\) হলো অজানা ফাংশন, যা \\( x \\) চলকের ওপর নির্ভরশীল।
- \\( \\frac{dy}{dx} \\) হলো \\( y \\) এর \\( x \\) অনুযায়ী প্রথম ডেরিভেটিভ।
- \\( f(x, y) \\) হলো \\( x \\) এবং \\( y \\) এর ফাংশন।

### উদাহরণ:
1. **প্রথম ক্রমের সাধারণ ডিফারেন্সিয়াল সমীকরণ**: 
   \\[
   \\frac{dy}{dx} = 3x + 2
   \\]
   এই সমীকরণটি প্রথম ক্রমের কারণ এখানে \\( y \\) এর প্রথম ডেরিভেটিভ অন্তর্ভুক্ত আছে।

2. **দ্বিতীয় ক্রমের সাধারণ ডিফারেন্সিয়াল সমীকরণ**: 
   \\[
   \\frac{d^2y}{dx^2} + 3\\frac{dy}{dx} + 2y = 0
   \\]
   এই সমীকরণটি দ্বিতীয় ক্রমের কারণ এখানে \\( y \\) এর দ্বিতীয় ডেরিভেটিভ অন্তর্ভুক্ত আছে।

### সাধারণ ডিফারেন্সিয়াল সমীকরণগুলির সমাধান:
ডিফারেন্সিয়াল সমীকরণগুলির সমাধান বলতে আমরা বুঝি সেই অজানা ফাংশনটি যা সমীকরণটি পূরণ করে। সমাধান পদ্ধতি সমীকরণের ধরণ ও ক্রম অনুযায়ী ভিন্ন হয়। কিছু ডিফারেন্সিয়াল সমীকরণের জন্য স্পষ্ট আকারে সমাধান পাওয়া সম্ভব, আবার কিছু ক্ষেত্রে শুধুমাত্র সন্নিকট সমাধান পাওয়া যায়।`,
];

const ReactMarkdown = () => {
  const [markdown, setMarkdown] = useState();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormat = () => {
    setMarkdown(
      markdown
        .replaceAll("\\[", "$$$")
        .replaceAll("\\]", "$$$")
        .replaceAll("\\(", "$$")
        .replaceAll("\\)", "$$")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    if (!value.length) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/prompts", {
        method: "POST",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify({ prompt: value }),
      });
      const data = await res.json();
      setMarkdown(data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto justify-center flex flex-col max-w-7xl min-h-[50vh] space-y-4  relative w-full rounded-md p-2 ">
      <h3 className="text-3xl font-semibold text-center my-4">
        React Markdown
      </h3>
      <div className="flex justify-center items-center gap-3">
        <p>Hints (Open AI results):</p>
        {exampleMarkdown.map((text) => (
          <p
            className="p-1 hover:cursor-pointer rounded bg-indigo-50 border border-indigo-500 hover:text-indigo-700"
            key={text}
            onClick={() => setMarkdown(text)}
          >
            {text.slice(0, 50) + "..."}
          </p>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3">
        <p>Hints (prompts):</p>
        {hints.map((text) => (
          <p
            className="p-1 hover:cursor-pointer rounded bg-indigo-50 border border-indigo-500 hover:text-indigo-700"
            key={text}
            onClick={() => setValue(text)}
          >
            {text}
          </p>
        ))}
      </div>
      <div className="flex justify-center items-start gap-4">
        <div className="flex flex-col gap-4 justify-center items-center">
          <textarea
            name=""
            id=""
            placeholder="markdown"
            rows={8}
            cols={60}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className=" bg-gray-50 ring-0 outline-none border border-indigo-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block  p-2.5 checked:bg-emerald-500"
          ></textarea>
          <div className="space-x-4">
            <span className="text-lg text-light-green-900">
              👇 Markdown Preview
            </span>
            <button
              onClick={handleFormat}
              className="bg-indigo-950 text-indigo-400 border border-indigo-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
            >
              <span className="bg-indigo-400 shadow-indigo-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Format markdown
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 justify-center items-center"
        >
          <textarea
            name=""
            id=""
            placeholder="prompt"
            value={value}
            rows={8}
            cols={60}
            onChange={(e) => setValue(e.target.value)}
            className=" bg-gray-50 ring-0 outline-none border border-indigo-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block  p-2.5 checked:bg-emerald-500"
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r flex items-center gap-2 from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full font-semibold px-6 py-3 shadow-lg transform transition-all duration-500 ease-in-out  hover:brightness-110 hover:animate-pulse hover:scale-110 active:animate-spin"
          >
            {loading && (
              <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white-500 mx-auto"></div>
            )}
            {loading ? "Generating..." : "Ask Gemini"}
          </button>
        </form>
      </div>

      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        className="border h-96 p-2 overflow-y-auto"
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default ReactMarkdown;
