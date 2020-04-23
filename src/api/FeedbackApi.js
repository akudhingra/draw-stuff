export default class FeedbackApi {

  async SubmitFeedback(feedback) {
    return await fetch(`api/feedbacks`, {
      ...commonRequestInit,
      method: "POST",
      body: JSON.stringify(feedback),
    })
      .then(response => {
        if (response.ok) return response.json();
        // Todo: below does not log the inner message content, which is useful for debugging
        throw new Error(`Error submitting feedback: ${response.status} ${response.statusText}`);
      });
  }
}

const commonRequestInit = {
  mode: "cors", // no-cors, cors, *same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow", // manual, *follow, error
  referrer: "no-referrer", // no-referrer, *client
};