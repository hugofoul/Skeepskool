<?php
/**
 * Modèle de configuration de l'envoi d'e-mails (Resend).
 *
 * Avec le déploiement automatique (GitHub Actions), ce fichier est créé tout seul
 * à partir des secrets du dépôt : vous n'avez rien à faire.
 *
 * En déploiement manuel : copiez ce fichier sous le nom `config.php` dans le
 * dossier `api/` du site sur OVH (à côté de send-request.php) et remplissez-le.
 * Ne l'ajoutez jamais dans Git : il contient une clé secrète.
 */
return [
    // Clé API créée sur https://resend.com/api-keys (commence par "re_")
    'resend_api_key' => 're_xxxxxxxxxxxxxxxxxxxxxxxx',

    // Adresse qui reçoit les demandes
    'to' => 'skeepskool@hotmail.com',

    // Expéditeur. Tant que le domaine n'est pas vérifié dans Resend, gardez
    // "onboarding@resend.dev" : cela fonctionne si le compte Resend a été créé
    // avec l'adresse de destination ci-dessus.
    // Après vérification du domaine : 'Skeepskool <reservations@leporge-ecoledesurf.com>'
    'from' => 'Skeepskool <onboarding@resend.dev>',
];
