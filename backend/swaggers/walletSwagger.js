/**
 * @swagger
 * components:
 *   schemas:
 *     Wallet:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - balance
 *         - type
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user who owns the wallet
 *         name:
 *           type: string
 *           description: Name of the wallet
 *         balance:
 *           type: number
 *           description: Initial balance of the wallet
 *         type:
 *           type: string
 *           description: Type of the wallet (e.g., savings, checking)
 */

/**
 * @swagger
 * /user/wallets:
 *   post:
 *     summary: Create a new wallet
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wallet'
 *     responses:
 *       200:
 *         description: Wallet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wallet'
 *       400:
 *         description: User does not exist
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/getAllWallets/{userId}:
 *   get:
 *     summary: Get all wallets for a user
 *     tags: [Wallet]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of wallets for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wallet'
 *       400:
 *         description: Missing or invalid userId
 *       404:
 *         description: Wallets not found
 *       500:
 *         description: Server error
 */
