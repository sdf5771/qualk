import pandas as pd
import seaborn as sns

if __name__=="__main__":
    df = sns.load_dataset('tips')
    # df.groupby('day','time').agg({'day':'max', 'time':'max'})
    print(df.info)