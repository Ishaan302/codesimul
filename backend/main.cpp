// Start coding here...
#include <iostream>
using namespace std;
#define ll long long 
ll stick(ll x, ll y, ll k){
    ll maxstick = y * k + k;
    ll add = x - 1;
    ll step = (maxstick - 1 + add - 1) / add; 
    return step + k;
}
int main() {
    int t;
    cin >> t;
    while(t--){
        ll x, y, k;
        cin >> x >> y >> k;
        cout << stick(x,y,k)<< endl;
    }
    return 0;
}