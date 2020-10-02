updateData = submission => {
    this.refs.uid.value = submission.uid;
    this.refs.name.value = submission.name;
    this.refs.email.value = submission.email;
    this.refs.url.value = submission.url;
  }