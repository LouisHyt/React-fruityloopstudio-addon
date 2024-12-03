import { create } from 'zustand'

const pluginStore = (set, get) => ({
    pluginsOpen: [],
	setPluginOpen: (id) => set((state) => ({pluginsOpen: [...state.pluginsOpen, id]})),
    removePluginOpen: (id) => set((state) => ({pluginsOpen: state.pluginsOpen.filter(pluginId => pluginId !== id)})),
    pluginsPositions: [],
    setPluginsPosition: (value) => set((state) => {
        let pluginIndex = state.pluginsPositions?.findIndex(plugin => plugin.id === value.id);
        if(pluginIndex !== -1){
            let newPositions = state.pluginsPositions;
            newPositions[pluginIndex].x = value.x;
            newPositions[pluginIndex].y = value.y;
            return {pluginsPositions: newPositions}
            
        } else {
            return {
                pluginsPositions: [
                    ...state.pluginsPositions,
                    {
                        id: value.id,
                        x: value.x,
                        y: value.y
                    }
                ]
            }
        }
    })
})

export const usePluginStore = create(pluginStore); 