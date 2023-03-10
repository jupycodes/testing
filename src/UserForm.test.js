import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import UserForm from './UserForm'

test('it shows two inputs and a button', () => {
  //render the component
  render(<UserForm />)
  //manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByRole('button')
  //assertion: make sure component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument()
})

//NOT THE BEST IMPLEMENTATION
test('it calls onUserAdd when the form is submitted', () => {
  const argList =[]
  const callback = (...args) => {
    argList.push(args)
  }
  //try to render component
  render(<UserForm  onUserAdd={callback}/>) 
  //find two inputs
  const [nameInput, emailInput] = screen.getAllByRole('textbox')
  //simulate typing name and email
  user.click(nameInput)
  user.keyboard('Jane')
  user.click(emailInput)
  user.keyboard('jane@email.com')
  //find the button
  const button = screen.getByRole('button')
  //simulate clicking the button
  user.click(button)
  //assertion to make sure 'onUserAdd' gets called with email/
  expect(argList).toHaveLength(1)
  expect(argList[0][0]).toEqual({name: 'Jane', email: 'jane@email.com'})
})

test('Better: it calls onUserAdd when the form is submitted', () => {
  const mock = jest.fn()
  //try to render component
  render(<UserForm  onUserAdd={mock}/>) 
  //find two inputs
  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  })
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  })
  //simulate typing name and email
  user.click(nameInput)
  user.keyboard('Jane')
  user.click(emailInput)
  user.keyboard('jane@email.com')
  //find the button
  const button = screen.getByRole('button')

  //simulate clicking the button
  user.click(button)

  //assertion to make sure 'onUserAdd' gets called with email/
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({name: 'Jane', email: 'jane@email.com'})
})