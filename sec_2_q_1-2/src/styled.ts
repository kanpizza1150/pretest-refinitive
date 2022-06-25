import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px minmax(100px, 1fr) 300px;
  width: 100vw;
  min-width: 600px;
  overflow: scroll;
  height: 100vh;
  div {
    border: 1px solid black;
  }
`
