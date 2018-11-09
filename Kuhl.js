// Chart logic.
let countEinzellerActions = 0;
let countFruchtfliegenActions = 0;
let countFliegenActions = 0;
let countSimplyDivisionActions = 0;
let countNormalDivisionActions = 0;

let spec = {}
spec.update = 'qlearn'; // qlearn | sarsa
spec.gamma = 0.9; // discount factor, [0, 1)
spec.epsilon = 0.2; // initial epsilon for epsilon-greedy policy, [0, 1)
spec.alpha = 0.01; // value function learning rate
spec.experience_add_every = 10; // number of time steps before we add another experience to replay memory
spec.experience_size = 5000; // size of experience replay memory
spec.learning_steps_per_iteration = 20;
spec.tderror_clamp = 1.0; // for robustness
spec.num_hidden_units = 18 // number of neurons in hidden layer

let env = {};
env.getNumStates = () => 9;
env.getMaxNumActions = () => 5;

let agent = new RL.DQNAgent(env, spec);

let first = false;
let second = false;

let einzellerListe = [];
window.setInterval(() => {
    let s = [Einzeller, Fruchtfliegen, Fliegen, fliegePrice, fruchtFliegePrice, simplyCellDivisionPrice, normalCellDivisionPrice, first, second]
    let action = agent.act(s);

    einzellerListe.push(Einzeller);
    if (einzellerListe.length > 1000)
        einzellerListe.shift();

    switch (action) {
        case 0:
            addEinzeller();
            countEinzellerActions++;
            break;
        case 1:
            addFruchtfliege();
            countFruchtfliegenActions++;
            break;
        case 2:
            addFliege();
            countFliegenActions++;
            break;
        case 3:
            countSimplyDivisionActions++;
            if (!first && Einzeller >= 500) {
                buySimplyCellDivision();
                first = true;
            }
            break;
        case 4:
            countNormalDivisionActions++;
            if(!second && Einzeller >= 2500){
                buyNormalCellDivision();
                second = true;
            }
            break;
    }

    console.log(action);

    let oldAvg = 0
    for (let i = 0; i < einzellerListe.length >> 1; i++) {
        oldAvg += einzellerListe[i];
    }
    oldAvg /= einzellerListe.length >> 1;

    let avg = 0
    for (let i = einzellerListe.length >> 1; i < einzellerListe.length; i++) {
        avg += einzellerListe[i];
    }
    avg /= einzellerListe.length >> 1

    agent.learn(avg - oldAvg);
  }, 100);