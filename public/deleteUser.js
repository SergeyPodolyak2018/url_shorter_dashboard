async function deleteUser(id) {
  console.log(id);
  try {
    const response = await fetch(`/admin/user/${id}`, {
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
