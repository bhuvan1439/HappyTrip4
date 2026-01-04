const getRoutes = async (req, res) => {
    const { origin, destination } = req.query;
    // Mock routing data
    // In a real app, we would call Google Maps Directions API or Mapbox Directions API
    res.json({
        routes: [
            {
                id: 1,
                summary: 'Fastest Route',
                duration: '2 hours 15 mins',
                distance: '150 km',
                traffic: 'Moderate',
                coordinates: [
                    [51.505, -0.09],
                    [51.51, -0.1],
                    [51.52, -0.12]
                ] // Simplified path
            },
            {
                id: 2,
                summary: 'Scenic Route',
                duration: '3 hours',
                distance: '180 km',
                traffic: 'Low',
                coordinates: [
                    [51.505, -0.09],
                    [51.55, -0.05],
                    [51.6, -0.1]
                ]
            }
        ]
    });
};

module.exports = { getRoutes };
