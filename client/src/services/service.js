import http from "../http-common";

class CarService {
    getAll() {
        return http.get("/cars");
    }

    create(data) {
        return http.post("/cars", data);
    }

    update(id, data) {
        return http.put(`/cars/${id}`, data);
    }
}

export default new CarService();