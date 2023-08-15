const controller = {
    getCities: (req, res) => {
        res.json({
            cities: [
                {name: 'Barcelona'},
                {name: 'Paris'}
            ]
        });
    },
    postCities: () => {},
    deleteCities: () => {},
}

export default controller;