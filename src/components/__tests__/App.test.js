import { render, cleanup, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import App from '../../App'

describe('App', () => {
    afterEach(cleanup)

    test('should render App', () => {
        // Renders App
        render(<App/>)
        // Grabs App from render
        const AppComponent = screen.getByTestId('App-1')
        // Tests for expected App
        expect(AppComponent).toBeInTheDocument()
    })

    test('matches snapshot', () => {
        // Render component tree
        const tree = renderer.create(<App/>).toJSON()
        // Tests for matching snapshot
        expect(tree).toMatchSnapshot()
    })
})