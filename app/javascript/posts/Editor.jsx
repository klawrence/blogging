import React from 'react'

export function Editor() {
  return <form>
    <input type='text' name='title'/>
    <textarea name='body'/>
    <div className='actions'>
      <input type='submit' className='button'/>
    </div>
  </form>
}