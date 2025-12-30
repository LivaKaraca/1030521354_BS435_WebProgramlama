import React from "react";

const StartScreen = ({
  onStart,
}: {
  onStart: (mode: "classic" | "fast") => void;
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          padding: "40px 50px",
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          textAlign: "center",
          maxWidth: 420,
          width: "100%",
        }}
      >
        <h1 style={{ marginBottom: 10, fontSize: 32 }}>
          🤖 AI Tahmin Oyunu
        </h1>

        <p style={{ opacity: 0.85, marginBottom: 30 }}>
          Üç görselden hangisinin yapay zekâ tarafından üretildiğini bul!
        </p>

        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* CLASSIC MOD */}
          <button
            onClick={() => onStart("classic")}
            style={{
              padding: "14px 24px",
              borderRadius: 12,
              border: "none",
              fontSize: 16,
              cursor: "pointer",
              background: "#4CAF50",
              color: "#fff",
              fontWeight: "bold",
              minWidth: 160,
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            🎯 Klasik Mod
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>
              İpucu + 2 hak
            </div>
          </button>

          {/* FAST MOD */}
          <button
            onClick={() => onStart("fast")}
            style={{
              padding: "14px 24px",
              borderRadius: 12,
              border: "none",
              fontSize: 16,
              cursor: "pointer",
              background: "#FF5722",
              color: "#fff",
              fontWeight: "bold",
              minWidth: 160,
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            ⚡ Hızlı Mod
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>
              5 saniye · İpucu yok
            </div>
          </button>
        </div>

        <p
          style={{
            marginTop: 30,
            fontSize: 13,
            opacity: 0.7,
          }}
        >
          👀 Detaylara dikkat et!
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
