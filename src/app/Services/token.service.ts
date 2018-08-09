import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenService {

  constructor(private webService: WebService, private router: Router) { }

  refreshAccessToken(jsonStr: any) {
    return this.webService.refreshAccessToken(jsonStr);
  }

  verifyAccessToken(jsonStr: any) {
    return this.webService.isTokenValid(jsonStr);
  }

  setAccessToken(newKey: String, email: String) {
    localStorage.setItem('currentUser', JSON.stringify({AccessToken: newKey, Email: email}));
  }

  setRefreshToken(refreshToken: String, email: String) {
    localStorage.setItem('currentUserRefreshInfo', JSON.stringify({RefreshToken: refreshToken, Email: email}));
  }

  clearAllTokens() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserRefreshInfo');
  }


  setActivationToken(newKey: String) {
    localStorage.setItem('currentUserActivationInfo', JSON.stringify({ActivationToken: newKey}));
  }

  setResetToken(newKey: String, email: String) {
    localStorage.setItem('currentUserResetInfo', JSON.stringify({ResetToken: newKey, ResetEmail: email}));
  }

  doActivationTokenExist() {
    const localStorageObj = localStorage.getItem('currentUserActivationInfo');
    if (localStorageObj == null) { return false; } else { return true; }
  }

  doResetTokenExist() {
    const localStorageObj = localStorage.getItem('currentUserResetInfo');
    if (localStorageObj == null) { return false; } else { return true; }
  }

  removeActivationToken() {
    localStorage.removeItem('currentUserActivationInfo');
  }

  removeResetToken() {
    localStorage.removeItem('currentUserResetInfo');
  }


  getActivationTokenObject() {
    if (this.doActivationTokenExist()) {
      const localStorageObj = localStorage.getItem('currentUserActivationInfo');
      if (localStorageObj != null) {
        const currentUserActivationInfo = JSON.parse(localStorageObj);
        const jsonStr = {
          'ACTIVATION_TOKEN': currentUserActivationInfo.ActivationToken
        };
        return jsonStr;
      } else { return null; }
    } else { return null; }
  }


  getResetTokenObject() {
    if (this.doResetTokenExist()) {
      const localStorageObj = localStorage.getItem('currentUserResetInfo');
      if (localStorageObj != null) {
        const currentUserResetInfo = JSON.parse(localStorageObj);
        const jsonStr = {
          'RESET_TOKEN': currentUserResetInfo.ResetToken,
          'RESET_EMAIL': currentUserResetInfo.ResetEmail
        };
        return jsonStr;
      } else { return null; }
    } else { return null; }
  }

  verifyResetToken() {

    const localStorageObj = localStorage.getItem('currentUserResetInfo');
    if (localStorageObj != null) {
      const currentUserResetInfo = JSON.parse(localStorageObj);
      const jsonStr = {
        'RESET_TOKEN': currentUserResetInfo.ResetToken,
        'RESET_EMAIL': currentUserResetInfo.ResetEmail
      };
      return this.webService.verifyResetToken(jsonStr);
    }
  }

}
