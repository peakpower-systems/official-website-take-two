import geopandas as gpd
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

ny_counties = gpd.read_file("Counties.shp")
ny_counties['area_sq_miles'] = ny_counties['geometry'].area * 3.861e-7
print(ny_counties)
print(ny_counties['area_sq_miles'].values)

target_area = 1161.24822781
index_of_closest_area = (ny_counties['area_sq_miles'] - target_area).abs().idxmin()
closest_area = ny_counties.loc[index_of_closest_area, 'area_sq_miles']
print(f"Index of the entry with the area closest to {target_area} square miles: {index_of_closest_area}")
print(f"Area of the closest entry: {closest_area} square miles")

'''
Indexes of:
- Orange County: 35 (Area: 837.15)
- Rockland County: 43 (Area: 199.34072648)
- Westchester County: 59 (Area: 499.97010217)
- Sullivan County: 52 (Area: 995.44940022)
- Ulster County: 55 (Area: 1161.24822781)
- Dutchess County: 13 (Area: 824.4347364)
- Putnam County: 39 (Area: 245.98764885)
'''
indices_of_concern = [35, 43, 59, 52, 55, 13, 39]

# Plot the counties
fig, ax = plt.subplots()

# Plot the counties of concern in sepia color
ny_counties.loc[indices_of_concern].plot(ax=ax, color='#704214',
                                         edgecolor='black')

plt.savefig("nymap.png")
