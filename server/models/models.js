module.exports = (sequelize, Sequelize) => {
    const Cars = sequelize.define("cars", {
        company: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        }
    });
    return Cars;
}