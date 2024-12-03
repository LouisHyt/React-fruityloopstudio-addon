import './WidgetWrapper.css'
import { useEffect, useRef, useState } from 'react'
import { motion, useDragControls, useAnimationControls } from "framer-motion"
import { IoClose, IoCaretForward, IoSettingsSharp, IoRemoveSharp } from 'react-icons/io5'
import { usePluginStore } from '../../../stores/pluginStore'


const WidgetWrapper = ({widgetData, dragContainer, children}) => {
  
  const removePluginOpen = usePluginStore(state => state.removePluginOpen);
  const setPluginsPosition = usePluginStore(state => state.setPluginsPosition);
  const pluginPosition = usePluginStore(state => state.pluginsPositions.find(plugin => plugin.id === widgetData.id));
  const [isMinimized, setIsMinimized] = useState(false);

  const dragControls = useDragControls();
  const animationControls = useAnimationControls();
  const widgetRef = useRef(null);
  let debounce;
  const entriesSeen = new Set();

  const handleDragStart = event => {
    dragControls.start(event)
  }

  const handleWidgetClose = () => {
    resizeObserver.unobserve(widgetRef.current);
    removePluginOpen(widgetData.id);
    setPluginsPosition({
      id: widgetData.id,
      x: 0,
      y: 0
    })
  }


  const handleDragEnd = () => {
    const styles = widgetRef.current.computedStyleMap();
    console.log(styles.get('transform'));
  }

  const handleMinimized = () => {
    setIsMinimized(prev => !prev);
    animationControls.set({
      x: 0,
      y: 0,
      transform: 'none',
      opacity: 1,
        scale: 1,
        transition: {
          duration: 0.15,
          ease: 'easeInOut'
        }
    });
  }


  //when resize
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if(!entriesSeen.has(entry.target)){
        entriesSeen.add(entry.target);
        return
      }

      if(!entry.borderBoxSize) return
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const widgetHeight = entry.borderBoxSize[0].blockSize
        const widgetWidth = entry.borderBoxSize[0].inlineSize
        
        console.log(widgetHeight, widgetWidth);
      }, 500)
    }
  })

  useEffect(() => {

    resizeObserver.observe(widgetRef.current);

  }, [])

  const widgetVariants = {
    hidden : {
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.15,
          ease: 'easeInOut'
        }
    },
    visible : {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.15,
          ease: 'easeInOut'
        }
    }
  }

  return (
    <motion.div 
      className={`widget ${isMinimized ? 'minimized' : ''}`}
      drag={!isMinimized}
      dragMomentum={false}
      dragControls={dragControls}
      dragConstraints={dragContainer}
      dragElastic={0}
      dragListener={false}
      onDragEnd={handleDragEnd}
      ref={widgetRef}
      tabIndex={widgetData.id}
      variants={widgetVariants}
      animate='visible'
      initial="hidden"
      exit='hidden'
      style={!isMinimized ? {top: pluginPosition.y, left: pluginPosition.x} : {}}
    >
      <header onPointerDown={handleDragStart}>
        <section className='left-section'>
          <IoCaretForward className='icon options'/>
          <IoSettingsSharp className='icon settings'/>
          <div className='widget-details'>
            <span className='widget-name'>{widgetData.name}</span>
            <span className='name-details'>(Insert {widgetData.id})</span>
          </div>
        </section>
        <section className='right-section'>
          <IoRemoveSharp className='icon minimize' onClick={handleMinimized}/>
          <IoClose className='icon close' onClick={handleWidgetClose}/>
        </section>
      </header>
      <main>
        {children}
      </main>
    </motion.div>
  )
}

export default WidgetWrapper