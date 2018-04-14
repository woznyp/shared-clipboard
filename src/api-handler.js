class Request {
    prepare() {
      let xhr;
      const promise = new Promise((resolve, reject) => {
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            resolve(xhr.response);
          }
        };
      });
      return { promise, xhr };
    }

    get(url) {
      const requestObject = this.prepare();
      requestObject.xhr.open('GET', url);
      requestObject.xhr.send();
      return requestObject.promise;
    }

    post(url) {
      const requestObject = this.prepare();
      requestObject.xhr.open('POST', url);
      requestObject.xhr.send();
      return requestObject.promise;
    }
  }

  export default new Request();