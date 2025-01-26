import { Paper, Box, Typography } from "@mui/material";

const WeatherComponent = ({ data }) => {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" mt={2}>
      {Object.entries(data).map(([key, value]) => (
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            minWidth: 150,
            textAlign: "center",
            borderRadius: 2,
          }}
          key={key}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Typography>
          <Typography variant="body1">{value}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default WeatherComponent;
