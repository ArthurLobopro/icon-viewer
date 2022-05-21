const { ipcRenderer, contextBridge } = require('electron')

window.onload = () => {

    let isVisible = false

    let atualPath

    const addImage = document.getElementById('add')

    addImage.onclick = async () => {
        const [imagePath] = await ipcRenderer.invoke('add-file')
        ipcRenderer.send('change-icon', imagePath)
        if (imagePath !== false) {
            atualPath = imagePath
            if (!isVisible) {
                const wrapper = document.querySelectorAll('.img-wrapper')[1]
                wrapper.style.display = ""
                isVisible = true
            }
        }
    }

    const attImage = document.getElementById('att')

    attImage.onclick = () => ipcRenderer.send('change-icon', atualPath)

}