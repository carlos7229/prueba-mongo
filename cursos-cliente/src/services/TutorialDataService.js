import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/tutoriales");
  }

  get(id) {
    return http.get(`/tutoriales/${id}`);
  }

  create(data) {
    return http.post("/tutoriales", data);
  }

  update(id, data) {
    return http.put(`/tutoriales/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutoriales/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutoriales`);
  }

  findByTitle(titulo) {
    return http.get(`/tutoriales?titulo=${titulo}`);
  }
}

export default new TutorialDataService();