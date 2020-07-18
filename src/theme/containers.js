export const containers = {
  containers: {
    root: {
      main: {
        
      },
      sidebar: {
        main: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '200px',
          minHeight: '100vh',
          boxShadow: '0px 0px 18px -1px rgba(0,0,0,0.75)',
          zIndex: 1,
        },
      },
      screen: {
        main: {
          maxWidth: 'calc( 100vw - 200px )',
          position: 'relative',
          left: '200px',
        }
      }
    }
  }
}