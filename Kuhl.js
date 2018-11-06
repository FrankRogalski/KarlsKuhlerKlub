let spec = {}
spec.update = 'qlearn'; // qlearn | sarsa
spec.gamma = 0.9; // discount factor, [0, 1)
spec.epsilon = 0.2; // initial epsilon for epsilon-greedy policy, [0, 1)
spec.alpha = 0.01; // value function learning rate
spec.experience_add_every = 10; // number of time steps before we add another experience to replay memory
spec.experience_size = 5000; // size of experience replay memory
spec.learning_steps_per_iteration = 20;
spec.tderror_clamp = 1.0; // for robustness
spec.num_hidden_units = 100 // number of neurons in hidden layer

let env = {};

env.getNumStates = () => 3;
env.getMaxNumActions = () => 4;

let agent = new RL.DQNAgent(env, spec);

let first = false;
let second = false;

let einzellerListe = [];
window.setInterval(() => {
    let s = [Einzeller, Fruchtfliegen, Fliegen]
    let action = agent.act(s);

    einzellerListe.push(Einzeller);
    if (einzellerListe.length > 100) {
        einzellerListe.shift();
    }

    switch (action) {
        case 0:
            addEinzeller();
            break;
        case 1:
            addFruchtfliege();
            break;
        case 2:
            addFliege();
            break;
        case 3:
            if (!first) {
                buySimplyCellDivision();
                first = true;
            }
            break;
        case 4:
            if(!second){
                buyNormalCellDivision();
                second = true;
            }
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