import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/etudiants");
  }

  get(id) {
    return http.get(`/etudiants/${id}`);
  }

  create(data) {
    return http.post("/etudiants", data);
  }

  update(id, data) {
    return http.put(`/etudiants/${id}`, data);
  }

  delete(id) {
    return http.delete(`/etudiants/${id}`);
  }

  deleteAll() {
    return http.delete(`/etudiants`);
  }

  findByTitle(title) {
    return http.get(`/etudiants?title=${title}`);
  }
}

export default new TutorialDataService();