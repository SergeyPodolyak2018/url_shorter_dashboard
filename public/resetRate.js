async function resetUserRate(id) {
  console.log(id);
  try {
    const response = await fetch(`/admin/rate/${id}`, {
      method: 'PUT',
      redirect: 'follow',
    }).then((res) => {
      if (res.redirected) {
        document.location = res.url;
      }
    });
  } catch (e) {
    console.error(e);
  }
}
