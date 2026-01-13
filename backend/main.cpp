#include <bits/stdc++.h>
using namespace std;
 
#define ll long long
 
void solve() {
   
   ll  n ; 
   cin>>n;
 
   vector<ll>a(n);
   for(ll &x : a)cin>>x;
 
   sort(a.begin() , a.end());
 
   vector<ll>odd , even;
   for(ll i = 0 ; i<n ; i++){
      if(a[i] % 2==0){
         even.push_back(a[i]);
      }else{
         odd.push_back(a[i]);
      }
   }
 
   if(odd.empty() || even.empty()){
      cout<<"0"<<endl;
      return;
   }
 
   ll ans = even.size();
   ll sum = odd.back();
 
   for(ll i = 0  ; i<even.size() ; i++){
      if(even[i]<sum){
         sum+=even[i];
      }else{
         ans++;
         break;
      }
   }
   cout<<ans<<endl;
}
 
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
 
    int t;
    cin >> t;
    while (t--) solve();
}