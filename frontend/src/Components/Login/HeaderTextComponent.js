import React from 'react'
import { HeaderText } from '../Admin/styles/styles'

function HeaderTextComponent({title}) {
  return (
    <>
    <HeaderText>
{title}
</HeaderText>
<hr width="100%" size="2"/>
    </>
    
  )
}

export default HeaderTextComponent