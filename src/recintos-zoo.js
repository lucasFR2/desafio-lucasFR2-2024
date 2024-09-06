class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];
        
        const animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };

        if (!animais[animal]) {
            return { erro: "Animal inválido!" };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida!" };
        }

        const animalInfo = animais[animal];
        let recintosViaveis = [];

        for (let recinto of recintos) {
            const biomaAdequado = animalInfo.biomas.includes(recinto.bioma) ||
                (recinto.bioma === 'savana e rio' && animalInfo.biomas.includes('savana') && animalInfo.biomas.includes('rio'));

            if (!biomaAdequado) {
                continue; 
            }
            const possuiCarnivoros = recinto.animais.some(a => animais[a.especie].carnivoro);

            if ((animalInfo.carnivoro && recinto.animais.some(a => !animais[a.especie].carnivoro)) ||
                (!animalInfo.carnivoro && possuiCarnivoros)) {
                continue;
            }

            let espacoOcupado = recinto.animais.reduce((total, a) => {
                const animalTamanho = animais[a.especie].tamanho * a.quantidade;
                return total + animalTamanho;
            }, 0);

            if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
                espacoOcupado += 1; 
            }

            const espacoNecessario = animalInfo.tamanho * quantidade;

            if (recinto.tamanho >= espacoOcupado + espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanho - espacoOcupado - espacoNecessario} total: ${recinto.tamanho})`);
            }
        }
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
        return { recintosViaveis };
    }
}
export { RecintosZoo as RecintosZoo };
