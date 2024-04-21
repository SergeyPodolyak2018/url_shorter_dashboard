async function deleteShort(id) {
  try {
    const response = await fetch(`/admin/shorts/${id}`, {
      method: 'DELETE',
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
