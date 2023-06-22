const handleLoadingPage = (second) => {
    const loading = document.querySelector(".modal__cover")
    loading.classList.add("modal--active")
    window.setTimeout(() => {
        loading.classList.remove("modal--active")
    }, second * 1000)
}

export { handleLoadingPage }