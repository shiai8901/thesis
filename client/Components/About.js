import React from 'react'
import style from '../sass/About.scss'

export default React.createClass({
  render() {
    return (<div>
      <h1> What would you like to do? </h1>
      <table>  
      <col width="50" />
      <col width="300" />
      <col width="50" />
      <col width="300" />

      <thead>
        <tr>

          <th colSpan="2" className="left">
            Ask a question
          </th>
          <th colSpan="2">
            Answer a question
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="number"> 1.</td>
          <td className="left"> Post a question on any topic you'd like help with</td>
          <td className="number"> 1. </td>
          <td>Browse or search questions to find a question you'd like to answer </td>
        </tr>
        <tr>
          <td className="number">2. </td>
          <td className="left">Once someone has claimed your questions, you can choose to accept their help if you want </td>
          <td className="number">2. </td>
          <td>If you find a quesion you want to answer, click "Claim" </td>
        </tr>

          <td colSpan="4" className="last">
            <span className="number ">3.</span>
          Once a question has been accepted, you will receive an email with a room number to immediately start collaborating! </td>
      </tbody>
      </table>

    </div>)
  }
})
