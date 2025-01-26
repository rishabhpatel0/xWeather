const WeatherComponent = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: "800px",
      }}
    >
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            textAlign: "center",
            width: "150px",
          }}
        >
          <h3 style={{ margin: "0 0 10px", fontSize: "18px", color: "#333" }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </h3>
          <p style={{ margin: 0, fontSize: "16px", color: "#555" }}>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherComponent;
