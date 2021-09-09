import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";

export const LoadingSpinner = () => {
  const [htmlTemplate, setHtmlTemplate] = useState();
  const buildHtmlTemplate = () => {
    let styles = `
        <style>
        *{
            margin: 0;
            padding: 0;
        }

        body{
            width: 100vw;
            height:100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction:column;
            background-image: linear-gradient(to bottom, #ffae64, #ffbe7d, #ffcd97, #ffdcb3, #ffeacf);
        }

        p{
            font-size:3.5rem;
            margin-bottom:5rem;
        }

        .load{
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 20px solid transparent;
            border-top: 20px solid #C41E3A;
            border-bottom: 20px solid #C41E3A;
            animation: rotateAntiCW 1.8s linear infinite;
        }

        .load::after{
            content: '';
            position: absolute;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            border: 10px solid transparent;
            border-left: 15px solid #ffeacf;
            border-right: 15px solid #ffeacf;
            animation: rotate 1s linear infinite;
        }

        @keyframes rotate{
            0%{transform: rotate(0deg);}
            100%{transform: rotate(-360deg);}
        }

        @keyframes rotateAntiCW{
            0%{transform: rotate(0deg);}
            100%{transform: rotate(360deg);}
        }
        </style>
      `;
    let content = `
        <p>Preparando aplicacion</p>
        <span class="load"></span>
    `;

    const html = `
    <html>
        <head>
            ${styles}
        </head>
        <body>
            ${content}
        </body>
    </html>
    `;

    setHtmlTemplate(html);
  };

  useEffect(() => {
    buildHtmlTemplate();
  }, []);
  return <WebView originWhitelist={["*"]} source={{ html: htmlTemplate }} />;
};
