"use Client";
import Chat from "./components/chat";

export default function Home() {
  return (
    <div className="sketchfab-embed-wrapper">
      <div className="absolute top-0 left-0 w-full h-[43px] bg-black " />
      <iframe
        className="relative -z-10"
        title="Witch's room"
        frameBorder="0"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/20f9fbe5a5fe46a2b324b0c545a6454d/embed?autostart=1&preload=1&ui_settings=0"
      ></iframe>
      {/* <p
        style={{
          fontSize: "13px",
          fontWeight: "normal",
          margin: "5px",
          color: "#4A4A4A",
        }}
      >
        <a
          href="https://sketchfab.com/3d-models/witchs-room-20f9fbe5a5fe46a2b324b0c545a6454d?utm_medium=embed&utm_campaign=share-popup&utm_content=20f9fbe5a5fe46a2b324b0c545a6454d"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: "bold", color: "#1CAAD9" }}
        >
          Witch's room
        </a>{" "}
        by{" "}
        <a
          href="https://sketchfab.com/choi1112?utm_medium=embed&utm_campaign=share-popup&utm_content=20f9fbe5a5fe46a2b324b0c545a6454d"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: "bold", color: "#1CAAD9" }}
        >
          wacho
        </a>{" "}
        on{" "}
        <a
          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=20f9fbe5a5fe46a2b324b0c545a6454d"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: "bold", color: "#1CAAD9" }}
        >
          Sketchfab
        </a>
      </p> */}
      <Chat />
      <div className="absolute bottom-0 left-0 w-full h-[43px] bg-black " />
    </div>
  );
}
