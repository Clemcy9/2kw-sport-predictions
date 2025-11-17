function calculateProbability (odds) {
    let probability = (1 / odds) * 100
    return probability
}

export default calculateProbability