// Fonction qui calcule la factorielle d'un entier positif n
function fact(n) {
    if (n === 0) {
        return 1;
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Fonction applique qui applique une fonction f à chaque élément du tableau tab
function applique(f, tab) {
    return tab.map(f);
}


// Tests :
console.log(fact(6));  // Affiche 720 dans la console

console.log(applique(fact, [1, 2, 3, 4, 5, 6]));  // Affiche [1, 2, 6, 24, 120, 720]

console.log(applique(function(n) { return n + 1; }, [1, 2, 3, 4, 5, 6]));  // Affiche [2, 3, 4, 5, 6, 7]
