import { render, fireEvent, waitFor } from '@testing-library/vue'
import axios from 'axios'
import SearchForm from '../SearchForm'
import { wait } from 'moxios'

jest.mock('axios')

let component

beforeEach(() => {
  component = render(SearchForm)
})

describe("SearchBox's unit tests", () => {
  it('Renders an input in which user can type', () => {
    const { getByPlaceholderText } = component

    // Gets the input field
    const input = getByPlaceholderText(/Search something like 'Apollo'.../i)

    // Make sure the input field is empty
    expect(input.value).toEqual('')

    // Updates input field
    fireEvent.update(input, 'Jupiter')

    expect(input.value).toEqual('Jupiter')
  })

  it('Lets you choose media types', () => {
    const { getByLabelText } = component

    const images = getByLabelText(/images/i)
    const video = getByLabelText(/video/i)

    // By default, both are checked
    expect(images.checked).toEqual(true)
    expect(video.checked).toEqual(true)

    fireEvent.click(images)
    fireEvent.click(video)

    expect(images.checked).toEqual(false)
    expect(video.checked).toEqual(false)
  })

  it("Lets you pick a 'from' date", () => {
    const { getByLabelText } = component

    const fromDate = getByLabelText(/from/i)

    fireEvent.update(fromDate, '2020-06-06')

    expect(fromDate.value).toEqual('2020-06-06')
  })

  it("Lets you pick a 'to' date", () => {
    const { getByLabelText } = component

    const toDate = getByLabelText(/from/i)

    fireEvent.update(toDate, '1999-08-10')

    expect(toDate.value).toEqual('1999-08-10')
  })
})

describe("SearchForm's integration tests", () => {
  axios.get.mockImplementation(url => {
    if (
      url ===
      'images-api.nasa.gov/search?q=apollo%20moon&media_type=video,image&year_start=1999&year_end=2017'
    )
      return { status: 200 }
    else return { status: 404 }
  })

  let form, imagesBox, videoBox, fromDate, toDate, keywordsInput

  beforeEach(() => {
    const { getByLabelText, getByRole, getByPlaceholderText } = component

    form = getByRole('form')

    keywordsInput = getByPlaceholderText(/Search something like 'Apollo'.../i)
    imagesBox = getByLabelText(/images/i)
    videoBox = getByLabelText(/video/i)
    fromDate = getByLabelText(/from/i)
    toDate = getByLabelText(/to/i)

    // Check initial state
    expect(imagesBox.checked).toEqual(true)
    expect(videoBox.checked).toEqual(true)
  })

  it('Sends the correct request (good request)', async () => {
    const query = {
      keywordsToSearch: 'apollo moon',
      includeImages: true,
      includeVideo: true,
      dateStart: '1999-01-05',
      dateEnd: '2017-01-01'
    }

    fireEvent.update(keywordsInput, query.keywordsToSearch)
    fireEvent.update(fromDate, query.dateStart)
    fireEvent.update(toDate, query.dateEnd)

    fireEvent.submit(form)

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1))
    expect(axios.get).toHaveReturnedWith({ status: 200 })
  })

  it('Sends the correct request (bad request)', async () => {
    // request will fail because the form didn't get the correct input
    fireEvent.submit(form)

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2))
    expect(axios.get).toHaveNthReturnedWith(2, { status: 404 })
  })
})
