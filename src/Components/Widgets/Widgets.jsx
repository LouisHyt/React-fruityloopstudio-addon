import './Widgets.css'
import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import WidgetWrapper from './WidgetWrapper/WidgetWrapper.jsx'
import { Plugins } from './Plugins/index.js'
import { usePluginStore } from "../../stores/pluginStore";

const Widgets = () => {

  const pluginsOpenId = usePluginStore(state => state.pluginsOpen);
  const pluginsOpen = Plugins.filter(plugin => pluginsOpenId.includes(plugin.data.id))
  const dragContainer = useRef(null);
  
  return (
    <div className="widgets" ref={dragContainer}>
        <AnimatePresence>
          {pluginsOpen.map((plugin) => 
            <WidgetWrapper 
              widgetData={plugin.data}
              key={plugin.data.id}
              dragContainer={dragContainer}
            >
             {<plugin.element />}
            </WidgetWrapper>
          )}
        </AnimatePresence>
    </div>
  )
}

export default Widgets