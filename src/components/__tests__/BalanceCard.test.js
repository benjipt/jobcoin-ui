import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import BalanceCard from '../BalanceCard'

describe('BalanceCard', () => {
    afterEach(cleanup)

    test('should render BalanceCard component', () => {
        // Renders BalanceCard component
        render(<BalanceCard/>)
        // Grabs component from render
        const BalanceCardComponent = screen.getByTestId('BalanceCard-1')
        // Tests for expected component
        expect(BalanceCardComponent).toBeInTheDocument()
    })

    test('passed props should behave as expected', () => {
        // Mock prop
        const balance = '150'
        // Renders BalanceCard component with prop
        render(<BalanceCard balance={ balance } />)
        // Grabs BalanceCard component from render
        const BalanceCardComponent = screen.getByTestId('BalanceCard-1')
        // Tests for expected prop behavior
        expect(BalanceCardComponent).toHaveTextContent(balance)
    })

    test('matches snapshot', () => {
        // Mock prop
        const balance = '150'
        // Render component tree
        const tree = renderer.create(<BalanceCard balance={ balance } />).toJSON()
        // Tests for matching snapshot
        expect(tree).toMatchSnapshot()
    })
})