import satori from "satori";
// import { html } from "satori-html";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

// Theme colors for OG images
const getThemeColors = (theme = 'dark') => {
  if (theme === 'light') {
    return {
      background: "#FFFFFF",
      foreground: "#333333",
      accent: "#007ACC",
      muted: "#616161",
      border: "#CECECE",
      shadow: "#F3F3F3"
    };
  }
  // Default dark theme
  return {
    background: "#1E1E1E",
    foreground: "#BDA869",
    accent: "#9085C5",
    muted: "#8B8B9A",
    border: "#C59A8A",
    shadow: "#2A2A2A"
  };
};

// const markup = html`<div
//       style={{
//         background: "#fefbfb",
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: "-1px",
//           right: "-1px",
//           border: "4px solid #000",
//           background: "#ecebeb",
//           opacity: "0.9",
//           borderRadius: "4px",
//           display: "flex",
//           justifyContent: "center",
//           margin: "2.5rem",
//           width: "88%",
//           height: "80%",
//         }}
//       />

//       <div
//         style={{
//           border: "4px solid #000",
//           background: "#fefbfb",
//           borderRadius: "4px",
//           display: "flex",
//           justifyContent: "center",
//           margin: "2rem",
//           width: "88%",
//           height: "80%",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             margin: "20px",
//             width: "90%",
//             height: "90%",
//           }}
//         >
//           <p
//             style={{
//               fontSize: 72,
//               fontWeight: "bold",
//               maxHeight: "84%",
//               overflow: "hidden",
//             }}
//           >
//             {post.data.title}
//           </p>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "100%",
//               marginBottom: "8px",
//               fontSize: 28,
//             }}
//           >
//             <span>
//               by{" "}
//               <span
//                 style={{
//                   color: "transparent",
//                 }}
//               >
//                 "
//               </span>
//               <span style={{ overflow: "hidden", fontWeight: "bold" }}>
//                 {post.data.author}
//               </span>
//             </span>

//             <span style={{ overflow: "hidden", fontWeight: "bold" }}>
//               {SITE.title}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>`;

export default async (post, theme = 'dark') => {
  const colors = getThemeColors(theme);
  
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: colors.background,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        },
        children: [
          // Gradient accent bar on the left
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                left: "0",
                top: "0",
                width: "12px",
                height: "100%",
                background: `linear-gradient(180deg, ${colors.accent}, ${colors.foreground})`,
              },
            },
          },
          // Shadow/depth card
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "8px",
                right: "8px",
                border: `3px solid ${colors.border}`,
                background: colors.shadow,
                opacity: "0.6",
                borderRadius: "8px",
                width: "88%",
                height: "80%",
                margin: "2.5rem",
              },
            },
          },
          // Main content card
          {
            type: "div",
            props: {
              style: {
                border: `3px solid ${colors.border}`,
                background: colors.background,
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%",
                boxShadow: theme === 'light' ? "0 8px 24px rgba(0, 0, 0, 0.1)" : "0 8px 24px rgba(144, 133, 197, 0.15)",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "32px",
                    width: "90%",
                    height: "90%",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          height: "85%",
                          overflow: "hidden",
                        },
                        children: [
                          {
                            type: "h1",
                            props: {
                              style: {
                                fontSize: 76,
                                fontWeight: "bold",
                                marginBottom: "24px",
                                lineHeight: 0.95,
                                color: colors.foreground,
                                fontFamily: "monospace",
                                letterSpacing: "-0.02em",
                              },
                              children: post.data.title,
                            },
                          },
                          {
                            type: "p",
                            props: {
                              style: {
                                fontSize: 28,
                                color: colors.muted,
                                lineHeight: 1.4,
                                marginTop: "auto",
                                maxHeight: "40%",
                                overflow: "hidden",
                                fontFamily: "sans-serif",
                              },
                              children: post.data.description || "",
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          width: "100%",
                          marginTop: "auto",
                        },
                        children: {
                          type: "span",
                          props: {
                            style: { 
                              fontSize: 24,
                              color: colors.accent,
                              fontWeight: "600",
                              fontFamily: "monospace",
                              textTransform: "lowercase",
                              letterSpacing: "0.05em",
                            },
                            children: SITE.title.toLowerCase(),
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        post.data.title + (post.data.description || "") + SITE.title
      ),
    }
  );
};
