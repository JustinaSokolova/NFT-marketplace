const { ethers } = require("ethers");
const jwt = require('jsonwebtoken');
const mongo = require('../model/mongo.js');
const apiErrors = require('./api.errors.js');
const EmailValidator = require('email-validator');
const jwtSecret = 'replace_me_asap';
const minPasswordLength = 5;

async function signInOrUp(signIn, userRequest) {
    const {
        ethAddress,
        signedMessage,
        email,
        password
    } = userRequest;
    const response = {
        success: true,
        reason: undefined,
        httpErrorCode: undefined
    };

    if (ethAddress && signedMessage) {
        const checkSignatureResult = await _checkEthersAuthSignature(ethAddress, signedMessage);
        if (checkSignatureResult) {
            ethAddress = ethAddress.toLowerCase();
            if (signIn) {
                const userProfile = await mongo.findUserProfileByEthAddress(ethAddress);
                if (userProfile) {
                    const issueTokenResult = await _issueToken(userProfile.id);
                    response.success = true;
                    response['token'] = issueTokenResult.token;
                    response['ethAddress'] = ethAddress;
                    if (userProfile.email) {
                        response['email'] = userProfile.email;
                    }
                } else {
                    response.success = false;
                    response.reason = apiErrors.ERROR_WALLET_NOT_FOUND;
                    response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
                }
            } else {
                const signUpResult = await _trySignUp(userRequest);
                if (!signUpResult.success) {
                    response.success = false;
                    response['ethAddress'] = ethAddress;
                    response.reason = signUpResult.reason;
                    response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
                } else {
                    const issueTokenResult = await _issueToken(signUpResult.userId);
                    response['token'] = issueTokenResult.token;
                }
            }
        } else {
            response.success = false;
            response['ethAddress'] = ethAddress;
            response.reason = apiErrors.ERROR_BAD_SIGNATURE;
            response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
        }
    } else if (email && password) {
        if (signIn) {
            const userProfile = await mongo.findUserProfileByEmail(email);
            if (userProfile) {
                if (userProfile.password == password) {
                    const issueTokenResult = await _issueToken(userProfile.id);
                    response.success = true;
                    response['token'] = issueTokenResult.token;
                    response['email'] = email;
                    if (userProfile.email) {
                        response['ethAddress'] = userProfile.ethAddress;
                    }
                } else {
                    response.success = false;
                    response.reason = apiErrors.ERROR_BAD_EMAIL_OR_PASSWORD;
                    response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
                }
            } else {
                response.success = false;
                response.reason = apiErrors.ERROR_EMAIL_NOT_FOUND;
                response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
            }
        } else {
            const signUpResult = await _trySignUp(userRequest);
            if (!signUpResult.success) {
                response.success = false;
                response['email'] = email;
                response.reason = signUpResult.reason;
                response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
            } else {
                const issueTokenResult = await _issueToken(signUpResult.userId);
                response['token'] = issueTokenResult.token;
            }
        }
    } else {
        response.success = false;
        response.reason = apiErrors.ERROR_BAD_PARAMS;
        response.httpErrorCode = apiErrors.ERROR_BAD_PARAMS;
    }

    return response;

}

async function attachEmail(authToken, userRequest) {
    const response = {
        success: true,
        reason: undefined,
        httpErrorCode: undefined,
        email: userRequest.email
    };

    const result = await checkTokenAndGetProfile(authToken);

    if (result.success) {
        const emailAlreadyExists = await mongo.emailExists(userRequest.email);
        if (!emailAlreadyExists) {
            if (userRequest.email.length == 0 || userRequest.password.length < 6) {
                success = false;
                reason = Utils.ERROR_BAD_EMAIL_OR_PASSWORD;
                httpStatus = HttpStatus.BAD_REQUEST;
            } else {
                result.userProfile.email = userRequest.email;
                result.userProfile.password = userRequest.password;
                await result.userProfile.save();
                response['ethAddress'] = result.userProfile.ethAddress;
            }
        } else {
            response.success = false;
            response.reason = apiErrors.ERROR_EMAIL_EXISTS;
            response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
        }
    } else {
        response.success = false;
        response.reason = apiErrors.ERROR_BAD_PARAMS;
        response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
    }

    return response;
}

async function attachWallet(authToken, userRequest) {
    const response = {
        success: true,
        reason: undefined,
        httpErrorCode: undefined,
        ethAddress: userRequest.ethAddress
    };

    const result = await checkTokenAndGetProfile(authToken);

    if (result.success) {
        const checkSignatureResult = await _checkEthersAuthSignature(userRequest.ethAddress, userRequest.signedMessage);
        if (checkSignatureResult) {
            const walletAlreadyExists = await mongo.walletExists(userRequest.ethAddress);
            if (!walletAlreadyExists) {
                result.userProfile.ethAddress = dto.ethAddress;
                await result.userProfile.save();
                result['email'] = result.userProfile.email;
            } else {
                response.success = false;
                response.reason = apiErrors.ERROR_WALLET_EXISTS;
                response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
            }
        } else {
            response.success = false;
            response.reason = apiErrors.ERROR_BAD_SIGNATURE;
            response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
        }
    } else {
        response.success = false;
        response.reason = apiErrors.ERROR_BAD_PARAMS;
        response.httpErrorCode = apiErrors.HTTP_STATUS_CODE_BAD_REQUEST;
    }

    return response;
}

async function updatePassword(authToken, userRequest) {
    const result = await checkTokenAndGetProfile(authToken);
    if (result.success) {
        if (result.userProfile.password == userRequest.newPassword ||
            result.userProfile.password != userRequest.currentPassword ||
            userRequest.currentPassword == userRequest.newPassword ||
            userRequest.newPassword.length < minPasswordLength) {
            return {
                success: false,
                reason: apiErrors.ERROR_BAD_EMAIL_OR_PASSWORD,
                httpErrorCode: apiErrors.HTTP_STATUS_CODE_BAD_REQUEST
            }
        }

        result.userProfile.password = userRequest.newPassword;
        await result.userProfile.save();

        return {
            success: true
        }
    } else {
        return {
            success: false,
            reason: result.reason,
            httpErrorCode: apiErrors.HTTP_STATUS_CODE_BAD_REQUEST
        }
    }
}

async function logout(authToken) {
    const result = await checkTokenAndGetProfile(authToken);
    if (result.success) {
        result.userProfile.authToken = '';
        await result.userProfile.save();
        return {
            success: true
        }
    } else {
        return {
            success: false,
            reason: result.reason
        }
    }
}

async function verifyToken(requestAuthToken) {
    try {
        const userProfile = await mongo.findUserProfileByAuthToken(requestAuthToken);
        const authToken = userProfile.authToken;
        if (authToken && authToken.length > 0) {
            jwt.verify(authToken, jwtSecret);
            return {
                success: true,
                userProfile
            }
        } else {
            return {
                success: false
            }
        }
    } catch (err) {
        return {
            success: false
        }
    }
}

async function checkTokenAndGetProfile(authToken) {
    const userProfile = await mongo.findUserProfileByAuthToken(authToken);
    if (userProfile && await verifyToken(userProfile.authToken)) {
        return {
            success: true,
            userProfile
        }
    } else {
        return {
            success: false,
            reason: apiErrors.ERROR_BAD_AUTH
        }
    }
}

async function _trySignUp(request) {
    const response = {
        success: false,
        reason: '',
        userId: ''
    }

    if (request.email && request.ethAddress) {
        console.error(`signUp failed for ${request.email} / ${request.ethAddress}, impossible to signUp by both identifiers!`);
        response.reason = apiErrors.ERROR_BAD_PARAMS;
    } else {
        if (request.ethAddress) {
            const user = await mongo.findUserProfileByEthAddress(request.ethAddress);

            if (user) {
                this.logger.error(`signUp failed for ${request.ethAddress}, user already exists!`);
                response.reason = apiErrors.ERROR_WALLET_EXISTS;
            } else {
                const userModel = await mongo.createUserProfile({
                    ethAddress: request.ethAddress
                });
                response.success = true;
                response.userId = userModel.id;
            }
        } else if (request.email && request.password && EmailValidator.validate(request.email)) {
            request.email = request.email.toLowerCase();

            const user = await mongo.findUserProfileByEmail(request.email);

            if (user) {
                console.error(`signUp failed for ${request.email}, user already exists!`);
                response.reason = apiErrors.ERROR_EMAIL_EXISTS;
            } else {
                const userModel = await mongo.createUserProfile({
                    email: request.email,
                    password: request.password
                });

                response.success = true;
                response.userId = userModel.id;
            }
        } else {
            console.error(`signUp failed. Bad params: ${request.ethAddress} | (${request.email} / ${request.password})`);
            response.reason = apiErrors.ERROR_BAD_PARAMS;
        }
    }

    return response;
}

async function _checkEthersAuthSignature(address, signedMessage) {
    const signerAddr = ethers.utils.verifyMessage(Constants.AuthSignatureTemplate.replace('@', address), signedMessage);
    if (signerAddr != address) {
        return false;
    } else {
        return true;
    }
}

async function _issueToken(userId) {
    const data = { userId };
    const tokenResult = {
        token: jwt.sign({ data }, jwtSecret)
    };

    const userPorfile = await mongo.findUserProfileById(userId);
    userPorfile.authToken = tokenResult.token;
    userPorfile.save();

    return tokenResult;
}

module.exports = {
    signInOrUp,
    attachEmail,
    attachWallet,
    updatePassword,
    logout,
    verifyToken,
    checkTokenAndGetProfile
};