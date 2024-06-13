import { Content, fetchOneEntry, isPreviewing } from "@builder.io/sdk-react";
import { useEffect, useState } from "react";

// TODO: enter your public API key
const BUILDER_PUBLIC_API_KEY = "260b4ce863634909847273425ae73710"; // ggignore

export const customComponents = [
  {
    component: ({ title }) => <h2>{title}</h2>,
    name: "CustomBlock",
    inputs: [
      {
        name: "title",
        type: "text",
        defaultValue: "Hello world",
      },
    ],
  },
];

function App() {
  const [content, setContent] = useState(undefined);

  useEffect(() => {
    fetchOneEntry({
      model: "page",
      apiKey: BUILDER_PUBLIC_API_KEY,
      userAttributes: {
        urlPath: "/",
      },
    })
      .then((content) => {
        if (content) {
          setContent(content);
        }
      })
      .catch((err) => {
        console.log(
          "something went wrong while fetching Builder Content: ",
          err,
        );
      });
  }, []);

  const shouldRenderBuilderContent = content || isPreviewing();

  return shouldRenderBuilderContent ? (
    <Content
      content={content}
      customComponents={customComponents}
      model="page"
      apiKey={BUILDER_PUBLIC_API_KEY}
      canTrack={false}
    />
  ) : (
    <div>Content Not Found</div>
  );
}

export default App;
