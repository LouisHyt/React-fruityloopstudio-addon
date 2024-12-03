export const setUiSettingsStorage = (property, value) => {

    let UiSettingsStorage;
    if(!localStorage.getItem("uiSettings")){
        UiSettingsStorage = {};
    } else {
        UiSettingsStorage = JSON.parse(localStorage.getItem("uiSettings"));
    }

    UiSettingsStorage[property] = value
    localStorage.setItem("uiSettings", JSON.stringify(UiSettingsStorage))

}

export const getUiSettingsStorage = (property) => {
    if(localStorage.getItem("uiSettings")){
        return JSON.parse(localStorage.getItem("uiSettings"))?.[property]
    } else {
        return undefined
    }
}