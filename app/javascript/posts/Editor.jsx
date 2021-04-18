import React from 'react'

export function Editor() {
  return <form>
    <input type='text' name='title'  className='title'/>
    <textarea name='body' className='body' />
    <div className='actions'>
      <input type='submit' className='button'/>
    </div>
  </form>
}
